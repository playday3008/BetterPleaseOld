// Добавлено: Рамка в таблице
// Исправлено: Таблица не умещалась в рамку
// Исправлено: Текст не умещался на кнопках

// Ждём когда загрузится DOMContent
window.addEventListener('DOMContentLoaded', function() {

  // Если страница главная/входа
  if (location.pathname === '/') {

    // Ждём на присутствие таблицы с адрессами
    waitFor(function() {
      return document.querySelector("fieldset table")
    }()).then(table => {

      // Включаем рамку
      table.attributes.border.value = 1;
      // Толщина рамки 1px
      table.style.borderCollapse = "collapse";
      // Отступ от рамки
      let cellpadding = document.createAttribute("cellpadding");
      cellpadding.value = 2;
      table.attributes.setNamedItem(cellpadding);

      // Ждём на загрузку style.css
      waitFor(function() {
        return Array.from(document.styleSheets).find(el => el.href.includes("style.css"))
      }()).then(styleSheets => {

        // Desktop view
        let content = styleSheets.rules[Array.from(styleSheets.rules).findIndex(el => el.selectorText === "#content")];
        let page_center = styleSheets.rules[Array.from(styleSheets.rules).findIndex(el => el.selectorText === "#page_center")];
        content.style.width = "min-content";
        page_center.style.width = "max-content";

        // width < 1024px view
        let media1024 = styleSheets.rules[Array.from(styleSheets.rules).findIndex(el => el.conditionText === "(max-width: 1024px)")];
        media1024.insertRule("fieldset { min-width: inherit; overflow: auto; }", 0);

      });
    });
  }
  // Если страница подробностей о тунелле
  else if (location.pathname === "/tunnel_detail.php") {
    // Ждём на присутствие кнопок
    waitFor(function() {
      return document.querySelectorAll("#tunnelInfoTabs * div.tabContent div input")
    }()).then(input => {

      // Ждём на загрузку style.css
      waitFor(function() {
        return Array.from(document.styleSheets).find(el => el.href.includes("style.css"))
      }()).then(styleSheets => {

        // Удаляем значение высоты у кнопок
        styleSheets.rules[Array.from(styleSheets.rules).findIndex(el => el.selectorText === "#tunnelInfoTabs * div.tabContent div input")].style.height = '';

      });
    });
  }
});
