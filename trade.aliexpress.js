// Добавлено: Выбор количества заказов на страницу увеличен до всех заказов на одной странице

// Ждём когда загрузится DOMContent
window.addEventListener('DOMContentLoaded', function() {
  // Ждём на наличие текста с количеством страниц
  waitFor(function() {
    return document.querySelector("#simple-pager div label")
  }()).then(counter => {
      
    // Количество страниц
    let pages = parseInt(counter.innerText.split('/')[1]);
    
    // Ждём на наличие dropdown меню с выбором количества страниц
    waitFor(function() {
      return document.querySelector("#simple-pager select")
    }()).then(selector => {
      
      // Достаём стандартное количество заказов на страницу и текст "страницу" на языке сайта
      let option = selector.options[0].innerText;
      let text = option.split('/')[1];
      let mult = parseInt(option.split('/')[0]);
      // Очищаем dropdown меню
      selector.innerHTML = '';

      // Заполняем dropdown меню от mult до pages * mult
      for (let i = mult; i <= mult * pages; i += mult) {
        let opt = document.createElement('option');
        opt.value = i;
        opt.innerHTML = i + '/' + text;
        selector.appendChild(opt);
      }
    });
  });
});