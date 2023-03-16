// TODO: 使用者可以新增待辦事項
const addNewTodo = () => {
  // 抓取輸入框的值
  const value = $('#todo').val()
  $('.todolist__item').append(`
  <li class="no-completed">
    <input class="todolist__input" type="checkbox">
    <span> ${value} </span>
    <a class="delete" href="#">
      <i class="fa fa-x" aria-hidden="true"></i>
    </a>
  </li>
`)
  // 清空輸入框
  $('#todo').val('')

}

// 更新已完成項目
const updateCompletedCount = () => {
  const count = $('.todolist__item').find('.completed').length

  $('.todolist__info').find('a').text(count)
}

// TODO: 使用者可以刪除待辦事項
const deleteTodo = (e) => {
  // 找到被點擊的元素
  const target = $(e.target)
  target.parent().closest("li").remove()

}

// TODO: 清除已完成項目
const clearCompletedTodo = () => {
  // 找到 completed 的待辦事項，並移除 .completed class
  const completed = $('.todolist__item').find('.completed')
  completed.removeClass('completed')
  console.log(completed)

  // 用 jQuery remove() 方式移除 html
  completed.closest("li").remove()


  // 更新已完成項目
  $('.todolist__info').find('a').text(0)
  // 抓出 .todolist__item 待辦事項的 .completed class 數量
  // 用 jQuery text() 方式更新 html 已完成 [數字] 項目
}


// 監聽
$(() => {
  // TODO: 每一條代辦事項 delete 監聽 click 事件
  $('.todolist__item').on('click', '.delete', (e) => deleteTodo(e))


  // 狀態：全部、待完成、已完成
  $('.todolist__tabs li').each(function () {
    $(this).click(function () {
      $(this).siblings().find('a').removeClass('active')
      $(this).find('a').addClass('active')
    })
  })

  // TODO: 使用者可以將待辦事項設定成已完成
  // 步驟一：監聽每一個 todo list，前面 checkbox 有被點擊時執行 Function
  $('.todolist__item li').on('click', 'input', (e) => {
    // 步驟二：每條待辦事項根據條件，加上不同的 class：completed, no-complete
    console.log("click")
    const target = $(e.target)
    const parent = target.parent()
    console.log(parent)
    if (parent.hasClass('no-completed')) {
      parent.removeClass('no-completed')
      parent.addClass('completed')
    } else {
      parent.removeClass('completed')
      parent.addClass('no-completed')
    }

    // 步驟三：更新已完成項目的數字

    updateCompletedCount()

  })

  // 篩選全部
  $('.todolist__tabs').on('click', '.all', () => {
    $('.todolist__item').children().show()
  })

  // 編輯待辦事項
  $('.todolist__item').on('click', 'span', (e) => {
    const target = $(e.target)
    const parent = target.parent()
    const span = parent.find('span')
    const value = span.text()
    const input = $(`<input class="edit" type="text" value="${value}">`)
    span.replaceWith(input)
  })
    // TODO: 篩選待完成


    // TODO: 篩選已完成

})