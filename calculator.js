 (function() {
      "use strict";

      // ----- DOM refs -----
      const resultEl = document.getElementById('result');
      const expressionEl = document.getElementById('expression');

      // ----- state -----
      let currentInput = '0';          // what's shown on screen
      let previousInput = '';          // stored left operand
      let operator = null;            // current operator (string)
      let shouldResetScreen = false;   // flag to reset screen on next number
      let justEvaluated = false;       // for chaining after =

      // ----- helper: update display -----
      function updateDisplay() {
        // format number: if it's very long, shrink font via class
        const raw = currentInput;
        resultEl.textContent = raw;
        if (raw.length > 11) {
          resultEl.classList.add('shrink');
        } else {
          resultEl.classList.remove('shrink');
        }
        // expression: show previous + operator if exists
        if (operator && previousInput) {
          expressionEl.textContent = `${previousInput} ${operator}`;
        } else if (previousInput && !operator && justEvaluated) {
          // after evaluation, show previous result as expression? we can show result
          expressionEl.textContent = `${previousInput} =`;
        } else {
          expressionEl.textContent = '';
        }
      }

      // ----- core: evaluate -----
      function evaluate(a, op, b) {
        const numA = parseFloat(a);
        const numB = parseFloat(b);
        if (isNaN(numA) || isNaN(numB)) return 'Error';

        let result;
        switch (op) {
          case '+': result = numA + numB; break;
          case '−': result = numA - numB; break;
          case '×': result = numA * numB; break;
          case '÷': 
            if (numB === 0) return 'Error';
            result = numA / numB; 
            break;
          default: return numB; 
        }
        // avoid floating point noise
        if (Number.isFinite(result)) {
          const rounded = Math.round(result * 1e12) / 1e12;
          return String(rounded);
        }
        return 'Error';
      }

      // ----- handle input (number / decimal) -----
      function inputNumber(value) {
        if (justEvaluated) {
          // start fresh after evaluation
          currentInput = '0';
          previousInput = '';
          operator = null;
          justEvaluated = false;
          shouldResetScreen = false;
        }

        if (shouldResetScreen) {
          currentInput = value;
          shouldResetScreen = false;
        } else {
          if (value === '.' && currentInput.includes('.')) return; // avoid multiple dots
          if (currentInput === '0' && value !== '.') {
            currentInput = value;
          } else {
            currentInput += value;
          }
        }
        updateDisplay();
      }

      // ----- handle operator -----
      function handleOperator(op) {
        const current = currentInput;
        if (operator && !shouldResetScreen) {
          // chain calculation: evaluate previous before applying new operator
          const result = evaluate(previousInput, operator, current);
          if (result === 'Error') {
            currentInput = 'Error';
            operator = null;
            previousInput = '';
            updateDisplay();
            return;
          }
          currentInput = result;
          previousInput = result;
        } else {
          // first operator or after reset
          previousInput = current;
        }
        operator = op;
        shouldResetScreen = true;
        justEvaluated = false;
        updateDisplay();
      }

      // ----- handle equals -----
      function handleEquals() {
        if (!operator || !previousInput) {
          // if no operator, just show current (or evaluate percent? no)
          // but we allow pressing = after a number to do nothing.
          justEvaluated = true;
          expressionEl.textContent = `${currentInput} =`;
          return;
        }

        const result = evaluate(previousInput, operator, currentInput);
        if (result === 'Error') {
          currentInput = 'Error';
          operator = null;
          previousInput = '';
          justEvaluated = false;
          updateDisplay();
          return;
        }

        // store result as previous for chaining
        previousInput = result;
        currentInput = result;
        operator = null;
        shouldResetScreen = true;
        justEvaluated = true;
        expressionEl.textContent = `${previousInput} =`;
        updateDisplay();
      }

      // ----- clear (AC) -----
      function clearAll() {
        currentInput = '0';
        previousInput = '';
        operator = null;
        shouldResetScreen = false;
        justEvaluated = false;
        expressionEl.textContent = '';
        updateDisplay();
      }

      // ----- percent -----
      function percent() {
        const num = parseFloat(currentInput);
        if (isNaN(num)) return;
        const result = num / 100;
        currentInput = String(result);
        if (currentInput.length > 12) updateDisplay();
        updateDisplay();
        // keep operator context if any (but we don't change state)
        // if operator exists, we might want to keep it, but we just modify current input.
        // after percent, reset flag so typing continues
        shouldResetScreen = true;
        justEvaluated = false;
      }

      // ----- main button click handler -----
      function handleButton(value) {
        // special handling for 'clear'
        if (value === 'clear') {
          clearAll();
          return;
        }

        if (value === 'percent') {
          percent();
          return;
        }

        // numbers / decimal
        if (value === '.' || (value >= '0' && value <= '9')) {
          inputNumber(value);
          return;
        }

        // operators
        if (['+', '−', '×', '÷'].includes(value)) {
          handleOperator(value);
          return;
        }

        // equals
        if (value === '=') {
          handleEquals();
          return;
        }
      }

      // ----- attach event listeners to buttons -----
      const buttons = document.querySelectorAll('.btn');
      buttons.forEach(btn => {
        btn.addEventListener('click', function(e) {
          const value = this.dataset.value;
          if (value !== undefined) {
            handleButton(value);
          }
        });
      });

      // ----- keyboard support (bonus) -----
      document.addEventListener('keydown', function(e) {
        const key = e.key;

        // prevent default for keys we handle (avoid page scroll, etc)
        const controlKeys = ['Enter', 'Escape', 'Backspace', 'Delete', '%', '/', '*', '-', '+', '.', '='];
        if (controlKeys.includes(key) || (key >= '0' && key <= '9')) {
          e.preventDefault();
        }

        // mapping
        if (key >= '0' && key <= '9') {
          handleButton(key);
          return;
        }

        switch (key) {
          case '.':
            handleButton('.');
            break;
          case '+':
            handleButton('+');
            break;
          case '-':
            handleButton('−');
            break;
          case '*':
            handleButton('×');
            break;
          case '/':
            handleButton('÷');
            break;
          case 'Enter':
          case '=':
            handleButton('=');
            break;
          case 'Escape':
          case 'Delete':
            clearAll();
            break;
          case 'Backspace':
            // remove last character (if not 0 or error)
            if (currentInput === 'Error') {
              clearAll();
              return;
            }
            if (currentInput.length > 1) {
              currentInput = currentInput.slice(0, -1);
            } else {
              currentInput = '0';
            }
            // if we are in "shouldResetScreen" we clear but we don't want to reset?
            // when backspace after operator, we reset to previous? better: just edit current.
            // but if we have operator and shouldResetScreen is true, we can clear
            if (shouldResetScreen && operator) {
              // if after operator, backspace on current input should behave normally
              // keep currentInput as typed
            }
            updateDisplay();
            break;
          case '%':
            percent();
            break;
          default:
            // ignore other keys
            break;
        }
      });

      // ----- initial render -----
      updateDisplay();

      // small extra: handle error state properly
      // when error, clicking any number resets
      // we modify inputNumber to handle error reset
      const originalInputNumber = inputNumber;
      inputNumber = function(value) {
        if (currentInput === 'Error') {
          clearAll();
        }
        originalInputNumber.call(this, value);
      };

      // also handle operator when error
      const originalHandleOperator = handleOperator;
      handleOperator = function(op) {
        if (currentInput === 'Error') {
          clearAll();
        }
        originalHandleOperator.call(this, op);
      };

      // adjust equals when error
      const originalHandleEquals = handleEquals;
      handleEquals = function() {
        if (currentInput === 'Error') {
          clearAll();
          return;
        }
        originalHandleEquals.call(this);
      };

      // re-bind the functions to keep scope (already used via closures)
      // we override the original functions, but we keep the same names.
      // we need to make sure that the event handlers call the updated functions.
      // Since handleButton uses the functions directly, it's fine.

      // patch: update the handleButton to use the new functions (already reference)
      console.log('🧮 Calculator ready · keyboard + mouse');
    })();