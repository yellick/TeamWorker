/**
 * Функция не даёт ввести в поле больше символов ограничения
 * @param {object} element
 * @param {int} max_len
*/
function len_limit(element, max_len) {
	if (element.value.length > max_len) {
		element.value = element.value.slice(0, max_len);
	}
	
	element.oninput = function() {	    
		if (element.value.length > max_len) {
            element.value = element.value.slice(0, max_len);
        }
	};
}