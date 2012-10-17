function TodosWrapper(content)
{
    var res = "<table><th>ID</th><th>Descrizione</th><th>Data Creazione</th><th>Fatto</th><th>Data Chiusura</th>";
    res += content;
    res += "</table>";
    return res;
}

function TodoWrapper(todo) {
    var res = "<tr><td>" + todo.Id + "</td><td> " + todo.Description + "</td><td>" + todo.CreationDatetime + "</td><td>" + todo.Done + "</td><td>" + todo.DoneDatetime + "</td></tr>";
    return res;
}

function ErrorWrapper(jqXHR, textStatus, errorThrown) {
    return jqXHR + '<br /><br />' + textStatus + '<br /><br />' + errorThrown;
}

function ShowError(err, container) {
    //alert(err);

    $(container).html('<p style="color:red;">' + err + '</p>');
}

function ShowAllTodos(todos, container) {
    var content = "";
    if (todos.length > 0) {
        $.each(todos, function (index, todo) {
            content += TodoWrapper(todo);
        });
    }
    $(container).html(TodosWrapper(content));
}

function ShowTodo(todo, container) {
    if (todo != null) {
        $(container).html(TodosWrapper(TodoWrapper(todo)));
    }
    else {
        $(container).html("Nessun Risultato");
    }
}

function GetAllTodos() {
    $("#divGetAllTodos").html("<strong>Caricamento...</strong>");

    $.ajax({
        url: '/api/Todo/GetAll',
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            ShowAllTodos(data, $("#divGetAllTodos"));
        },
        error: function (jqXHR, textStatus, errorThrown) {
            ShowError(ErrorWrapper(jqXHR, textStatus, errorThrown), $("#divGetAllTodos"));
        }
    });
}

function GetTodo(id) {
    $("#divGetTodo").html("<strong>Caricamento...</strong>");

    $.ajax({
        url: '/api/Todo/Get/' + id,
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            ShowTodo(data, $("#divGetTodo"));
        },
        error: function (jqXHR, textStatus, errorThrown) {
            ShowError(ErrorWrapper(jqXHR, textStatus, errorThrown), $("#divGetTodo"));
        }
    });
}

function GetDoneTodos() {
    $("#divGetDoneTodos").html("<strong>Caricamento...</strong>");

    $.ajax({
        url: '/api/Todo/GetDoneTodos',
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            ShowAllTodos(data, $("#divGetDoneTodos"));
        },
        error: function (jqXHR, textStatus, errorThrown) {
            ShowError(ErrorWrapper(jqXHR, textStatus, errorThrown), $("#divGetDoneTodos"));
        }
    });
}

function GetTodosByStatus(status) {
    $("#divGetTodosByStatus").html("<strong>Caricamento...</strong>");

    $.ajax({
        url: '/api/Todo/GetTodosByStatus?status=' + status,
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            ShowAllTodos(data, $("#GetTodosByStatus"));
        },
        error: function (jqXHR, textStatus, errorThrown) {
            ShowError(ErrorWrapper(jqXHR, textStatus, errorThrown), $("#GetTodosByStatus"));
        }
    });
}

function PostTodo(description, status) {
    $("#divPostTodo").html("<strong>Caricamento...</strong>");

    var todo = {
        ID: null,
        Description: description,
        Done: status,
        CreationDatetime: new Date(),
        DoneDatetime: null
    };

    $.ajax({
        url: '/api/Todo/Post',
        type: 'POST',
        data: JSON.stringify(todo),
        contentType: "application/json;charset=utf-8",
        success: function (data) {
            ShowTodo(data, $("#divPostTodo"));
        },
        error: function (jqXHR, textStatus, errorThrown) {
            ShowError(ErrorWrapper(jqXHR, textStatus, errorThrown), $("#divPostTodo"));
        }
    });
}

function PutTodo(id, description, status) {
    $("#divPutTodo").html("<strong>Caricamento...</strong>");

    var todo = {
        ID: null,
        Description: description,
        Done: status,
        CreationDatetime: new Date(),
        DoneDatetime: null
    };

    $.ajax({
        url: '/api/Todo/Put/' + id,
        type: 'PUT',
        data: JSON.stringify(todo),
        contentType: "application/json;charset=utf-8",
        success: function (data) {
            //alert(data);
            $("#divPutTodo").html("<strong>OK!</strong>");
        },
        error: function (jqXHR, textStatus, errorThrown) {
            ShowError(ErrorWrapper(jqXHR, textStatus, errorThrown), $("#divPutTodo"));
        }
    });
}

function DeleteTodo(id) {
    $("#divDeleteTodo").html("<strong>Caricamento...</strong>");

    $.ajax({
        url: '/api/Todo/Delete/' + id,
        type: 'DELETE',
        contentType: "application/json;charset=utf-8",
        success: function (data) {
            //alert(data);
            $("#divDeleteTodo").html("<strong>OK!</strong>");
        },
        error: function (jqXHR, textStatus, errorThrown) {
            ShowError(ErrorWrapper(jqXHR, textStatus, errorThrown), $("#divDeleteTodo"));
        }
    });
}

function CloseTodo(id) {
    $("#divCloseTodo").html("<strong>Caricamento...</strong>");

    $.ajax({
        url: '/api/Todo/PutClose/' + id,
        type: 'PUT',
        contentType: "application/json;charset=utf-8",
        success: function (data) {
            //alert(data);
            $("#divCloseTodo").html("<strong>OK!</strong>");
        },
        error: function (jqXHR, textStatus, errorThrown) {
            ShowError(ErrorWrapper(jqXHR, textStatus, errorThrown), $("#divCloseTodo"));
        }
    });
}