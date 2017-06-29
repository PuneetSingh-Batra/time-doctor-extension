$(document).ready(function(){
  var access_token = urlParam('access_token');
  console.log(access_token);
  if(access_token != null && access_token != ""){
    $("body").empty();
    $("body").append("<div id='resDiv'></div>");
    var get_companies_url = "https://webapi.timedoctor.com/v1.1/companies?access_token=" + access_token;

    $.get(get_companies_url, function(data, status){
      console.log(data);
      $("#resDiv").append("<h1>Users</h1>");
      var companies = data.accounts;
      $.each(companies, function(index,company){
        var get_users_url = "https://webapi.timedoctor.com/v1.1/companies/" + company.company_id + "/users?access_token=" + access_token;
        $.get(get_users_url, function(userdata, userstatus){
          var users = userdata.users;
          $.each(users, function(index,user){
            $("#resDiv").append("<span>" + user.full_name + "</span>&nbsp;&nbsp;&nbsp;<span>" + user.email + "</span>&nbsp;&nbsp;&nbsp;<span>" + user.level + "</span>&nbsp;&nbsp;&nbsp;<span><a href='javascript:;' class='showTasks' data-user-id='" + user.user_id + "' data-company-id='" + user.company_id + "'>Show Tasks</a></span>");
            $("#resDiv").append("<br><br>");
          });
          $("#resDiv").append("<br>");
        });
      });
    });
  }

  $('body').on('click', 'a.showTasks', function() {
    var user_id = $(this).data("user-id");
    var company_id = $(this).data("company-id");
    console.log(user_id, company_id);
    var get_users_tasks_url = "https://webapi.timedoctor.com/v1.1/companies/" + company_id + "/users/" + user_id + "/tasks?access_token=" + access_token;
    $.get(get_users_tasks_url, function(data, status){
      var tasks = data.tasks;
      if(tasks.length > 0){
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

  function urlParam(name){
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results==null){
      return null;
    }
    else{
      return decodeURI(results[1]) || 0;
    }
  }
});
