/**
 * Drop Down Menu
 */
class DropDownMenu {
  constructor(el) {
    this.dd = el;
    this.initEvents();
  }
  initEvents() {
    var obj = this;

    obj.dd.on('click', function (event) {
      $(this).toggleClass('active');
      event.stopPropagation();
    });
  }
}