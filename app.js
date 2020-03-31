(function () {
  var running = false;
  var i;
  var date = localStorage.getItem('_date') || '1000-01-01';
  $(document.body).append(`
      <div id="container" style="position: absolute; opacity: 0.2; bottom:0; right: 0; display: flex">
          <div id="hide_button" style='padding: 10px; background: #fff; border: 1px black solid'>Show</div>
          <input format="YYYY/MM/DD" id="date_input" type="date" />
          <div id="start_button" style='padding: 10px; background: #fff'>Run</div>
          <div id="reset_button" style='padding: 10px; background: #fff'>Reset</div>
      </div>
  `);
  $("#date_input").val(date);
  $("#date_input,#start_button,#reset_button").toggle();
  $('#reset_button').on("click", () => {
    $("#date_input").val('1000-01-01');
    localStorage.setItem('_date', '1000-01-01');
  });
  $('#hide_button').on("click", () => {
    $("#date_input,#start_button,#reset_button").toggle();
    $('#hide_button').text($('#hide_button').text() === 'Show' ? 'Hide' : 'Show')
  });
  $('#start_button').on("click", () => {
    if (running) {
      running = false;
      clearInterval(i);
      $('#start_button').text('Run');
    } else {
      running = true;
      $('#start_button').text('Stop');
      var d = moment($("#date_input").val());
      i = setInterval(() => {
        d = d.add(1, 'day');
        var dFormat = d.format('YYYY-MM-DD');
        $("#date_input").val(dFormat);
        localStorage.setItem('_date', dFormat);
        var t = new SFS2X.SFSObject();
        t.putInt("id", 1);
        t.putUtfString("date", d.format('YYYY-MM-DD')),
          window.sfsControl.sfs.send(new SFS2X.ExtensionRequest("dailyquests.collectQuest", t));
        var newYear = d.format('YYYY');
      }, 10);
    }
  });
}());
(function () {
  const button = $("<div>....</div>");
  button.css({
    position: 'fixed',
    bottom: '25%',
    left: '0',
    padding: '50px 30px',
    background: '#fff',
    border: '1px black solid',
    opacity: 0.05,
  });
  $("body").append(button);
  const messages = [
    'Gấc',
    'Gấc cả giàn',
    'Đỏ thế ai chơi',
    'Gấc vl',
    'Gấc thế ai chơi',
    'Đánh thế ai chơi!',
    'Cao thủ !!!',
    'Bài xấu vl',
    '???',
    'Đen quá',
    'Thua đi cưng!',
    'Nhanh lên má!',
    'Chơi hay nghỉ đây',
    'Thua đi cưng!'

  ];
  let selectedUser = '';
  const users = [
    'Đại',
    'Vinh',
    'Tài',
    'Phương',
    'Thành',
    'Dũng',
  ]
  const userMessages = [
    'gấc',
    'đỏ vl',
    'ăn hết',
    'hơn gấc',
    'gấc cả giàn',
    'đỏ thế ai chơi',
  ]
  const div = $('<div></div>');
  div.css({
    height: '100%',
    width: '100%',
    top: 0,
    left: 0,
    padding: '40px 70px',
    position: 'fixed',
    overflow: 'auto',
    display: 'flex',
    alignItems: 'flex-end',
    backgroundColor: 'rgba(0,0,0,.2)',
  });
  div.on('click', () => div.hide());
  $("body").append(div);
  div.toggle()
  const childDiv = $('<div>');
  const childDiv2 = $('<div>');
  const childDiv3 = $('<div>');
  childDiv.css({
    maxHeight: "100%",
    overflow: 'auto',
    width: 300,
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  });
  childDiv2.css({
    maxHeight: "100%",
    overflow: 'auto',
    width: 150,
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginLeft: 10,
  });
  childDiv3.css({
    maxHeight: "100%",
    overflow: 'auto',
    width: 300,
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  });
  div.append(childDiv)
  div.append(childDiv2)
  div.append(childDiv3)
  childDiv3.toggle();
  messages.forEach((item) => {
    const message = $('<div>');
    message.css({
      margin: '3px 0',
      padding: 5,
      background: '#009999',
      color: 'white',
      width: '49%'
    })
    message.text(item);
    message.addClass('chat-item');
    childDiv.append(message)
  });
  userMessages.forEach((item) => {
    const message = $('<div>');
    message.css({
      margin: '3px 0',
      padding: 5,
      background: '#009999',
      color: 'white',
      width: '49%'
    })
    message.text(item);
    message.addClass('user-chat-item');
    childDiv3.append(message)
  });
  users.forEach((item) => {
    const user = $('<div>');
    user.css({
      margin: '3px 0',
      padding: 5,
      background: '#009999',
      color: 'white',
      width: '49%'
    })
    user.text(item);
    user.addClass('user-item');
    childDiv2.append(user)
  });
  button.on('click', () => {
    div.show();
    childDiv.show();
    childDiv2.show();
    childDiv3.hide();
  })
  $('.chat-item').on('click', function () {
    div.toggle();
    sendMessage($(this).text());
  });
  $('.user-item').on('click', function (e) {
    e.stopPropagation()
    selectedUser = $(this).text()
    childDiv.hide();
    childDiv2.hide();
    childDiv3.show();
  });
  $('.user-chat-item').on('click', function () {
    div.toggle();
    sendMessage(`${selectedUser} ${$(this).text()}`);
  });

  const sendMessage = (text) => {
    window.sfsControl.sfs.send(
      new SFS2X.PublicMessageRequest(text),
      null, window.sfsControl.sfs.lastJoinedRoom
    )
  }
}())