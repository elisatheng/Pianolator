$(function() {
	var operatorsArr = ['+', '-', '*', '/', '%', '^'],
		operatorsNotDoneArr = ['√', 'tan', 'cos', 'sin', 'exp', '!'];
	
	$('.keys .operators > *, .keys .numbers > *').click(function() {
		var clickedKey = $(this).text(),
			resultContent = $('.screens .result').text(),
			msContent;

		switch(clickedKey) {
			case 'C':
				$('.screens .result').empty();
				break;
			case '←':
				$('.screens .result').empty().append(resultContent.substring(0, resultContent.length - 1));
				break;
			case '=':
				var total = splitFormula(resultContent).toString();
				total = total.replace(/e\+[0-9]+/g, "");
				total = total.replace(/NaN[0-9]+/g, "");
				total = total.replace(/false/g, "");
				clickedKey ='';
				$('.screens .result').empty().append(total);
				break;
			case 'Ms':
				$('.screens .stock').empty().append(resultContent);
				break;
			case 'M+':
				if ($('.screens .stock').text() != '') {
					msContent = '+' + $('.screens .stock').text();
					$('.screens .result').append(msContent);
				}	
				break;
			case 'M-':
				if ($('.screens .stock').text() != '') {
					msContent = '-' + $('.screens .stock').text();
					$('.screens .result').append(msContent);
				}
				break;
			default:
				if ($.inArray(clickedKey, operatorsNotDoneArr) === -1) {
					$('.screens .result').append(clickedKey);
				}
				break;
		}
	});

	function splitFormula(str) {
		var number = '', 
			numbersArr = [], 
			operatorsStr = '';

		for (var c = 0; c < str.length; c++) {
      		if ($.inArray(str[c], operatorsArr) !== -1) {
				numbersArr.push(number);
				operatorsStr += str[c];
				number = '';
			}
			else {
				number += str[c];
			}
			
		}
		numbersArr.push(number);

		//calcul
		if (operatorsStr !== '') {
			var step1 = 1, 
				step0 = 0, 
				result, 
				numbersArr_nb = numbersArr.length;

			while (step1 < numbersArr_nb) {
				var x = numbersArr[step0];
				var y = numbersArr[step1];
				var op = operatorsStr[step1 - 1];

				result = calculate(x, y, op);
				numbersArr[step1] = result;
				step1++;
				step0++;
			}

			return result;
		}
		else {
			return number;
		}
	}

	function calculate(a, b, op) {
    	var r;

    	if (isNaN(a) || isNaN(b)) {
    		alert("Failed: cannot calculate with a signed number");
    		return false;
    	}
    	else {
    		a = parseFloat(a);
    		b = parseFloat(b);
    	}

		switch (op) {
			case '+':
				r = a + b;
				break; 
			case '-':
				r = a - b;
				break;
			case '*':
				r = a * b;
				break;
			case '/':
				r = a / b;
				break;
			case '%':
				r = a % b;
				break;
			case '^':
				if (b == 0) {
					r = 1;
				}
				else {
					r = 1;
					for (var i = 0; i < b; i++) {
						r *= a;
					}
				}
		}

		return r;
	}

});