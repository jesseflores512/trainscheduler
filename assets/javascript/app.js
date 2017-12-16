firebase.initializeApp(config);

// Create a variable to reference the database
var database = firebase.database();

var trainRef = database.ref('/trains');

var updateTable = function updateTable (user){
  var currentDate = moment();
  var minutesAway;

  $("#etrainTable").append (
    ` <tr>
      <td>${user.train}</td>
      <td>${user.dest}</td>
      <td>${moment(user.frequency).format('L')}</td>
      <td>${monthsWorked}</td> //months worked
      <td>${user.frequency}</td>
    </tr>
    `
  )
};

trainsRef.on('child_added', function(snapshot) {
  // Add new user to the DOM
  updateTable(snapshot.val());
});

// Handle submit button
$('form').submit(function(e) {

  if ($('#trainInput').val() && $('#destination').val() && $('#firstTrain').val() && $('#frequency').val()) {
    // Build an trains object from input forms
    const trains = {
      train: $('#trainInput').val().trim(),
      dest: $('#destination').val().trim(),
      first: $('#firstTrain').val().trim(),
      frequency: $('#frequency').val().trim()
    }
    // Push new trains to database
    trainsRef.push(trains);

    // Reset the form
    $('#trainInput').val('');
    $('#destination').val('');
    $('#firstTrain').val('');
    $('#frequency').val('');
  } else {
    console.log('Invalid input!');
  }

  return false;
});
