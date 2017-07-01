$(document).ready(function(){
  var access_token = urlParam('access_token'); //get the access_token which is used in other requests using the WebAPI
  console.log(access_token);
  if(access_token != null && access_token != ""){
    $("body").empty(); //clear the whole body of the webpage
    $("body").append("<div id='resDiv'></div>"); // append a clear div with id 'resDiv' in the body
    var get_companies_url = "https://webapi.timedoctor.com/v1.1/companies?access_token=" + access_token; // WebAPI request url for getting the companies

    $.get(get_companies_url, function(data, status){ //get companies using the WebAPI of TimeDoctor
      console.log(data);
      $("#resDiv").append("<h1>Users</h1>");
      var companies = data.accounts;
      $.each(companies, function(index,company){ //loop through the companies and get the company_id which is required for the USERS request and show All users in the body(div with resDiv) of the webpage
        var get_users_url = "https://webapi.timedoctor.com/v1.1/companies/" + company.company_id + "/users?access_token=" + access_token; // WebAPI request url for getting the users in company; Requirements: company_id
        $.get(get_users_url, function(userdata, userstatus){ //get users of a company using the WebAPI of TimeDoctor
          var users = userdata.users;
          $.each(users, function(index,user){ //loop through the users and append in the body of the webpage
            $("#resDiv").append("<span>" + user.full_name + "</span>&nbsp;&nbsp;&nbsp;<span>" + user.email + "</span>&nbsp;&nbsp;&nbsp;<span>" + user.level + "</span>&nbsp;&nbsp;&nbsp;<span><a href='javascript:;' class='showTasks' data-user-id='" + user.user_id + "' data-company-id='" + user.company_id + "'>Show Tasks</a></span>");
            $("#resDiv").append("<br><br>");
          });
          $("#resDiv").append("<br>");
        });
      });
    });
  }

  /*
  * Click on the 'Show Tasks' link,
  * showing respective user Tasks
  * Requirements: user_id, company_id
  */
  $('body').on('click', 'a.showTasks', function() {
    var user_id = $(this).data("user-id");
    var company_id = $(this).data("company-id");
    console.log(user_id, company_id);
    var get_users_tasks_url = "https://webapi.timedoctor.com/v1.1/companies/" + company_id + "/users/" + user_id + "/tasks?access_token=" + access_token; // WebAPI request url for getting the tasks of a user in a company; Requirements: company_id, user_id
    $.get(get_users_tasks_url, function(data, status){
      var tasks = data.tasks;
      if(tasks.length > 0){ //if there were tasks for the clicked user; show the tasks
        console.log(tasks);
        $("#resDiv").append("<h1>Tasks</h1>");
        $.each(tasks, function(index, task){
          $("#resDiv").append("<span class='hideTasksP'><span>" + task.task_id + "</span>&nbsp;&nbsp;&nbsp;<span>" + task.task_name + "</span>&nbsp;&nbsp;&nbsp;<span>" + task.active + "</span></span>");
          $("#resDiv").append("<br><br>");
        });
        $("#resDiv").append("<br>");
      }
    });
  });

  /*
  * @params: param_key e.g. 'access_token' in the url htpp://example.com?res=abc&access_token=ERFF67HB767GTIOVBW7
  * Provide the 'url param key'
  * returns value of the param_key from the url if matched
  */
  function urlParam(param_key){
    var results = new RegExp('[\?&]' + param_key + '=([^&#]*)').exec(window.location.href);
    if (results==null){
      return null;
    }
    else{
      return decodeURI(results[1]) || 0; //decode the URI
    }
  }
});
