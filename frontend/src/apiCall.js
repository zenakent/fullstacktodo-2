const APIURL = "/api/todos";

export async function getTodos() {
  try {
    let response = await fetch(APIURL);
    let data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function createTodo(val) {
  try {
    let response = await fetch(APIURL, {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json"
      }),
      body: JSON.stringify({ todo: val })
    });
    let res = await response.json();
    return res;
  } catch (error) {
    console.log(error);
  }
}

export async function deleteTodo(id) {
  try {
    let response = await fetch(`${APIURL}/${id}/delete`, { method: "DELETE" });
    return response.json();
  } catch (error) {
    console.log(error);
  }
}

export async function completeTodo(id) {
  try {
    let res = await fetch(`${APIURL}/${id}/complete`, { method: "PUT" });
    return res.json();
  } catch (error) {
    console.log(error);
  }
}

export async function editTodo(id, val) {
  try {
    let res = await fetch(`${APIURL}/${id}/edit`, {
      method: "PUT",
      headers: new Headers({
        "Content-Type": "application/json"
      }),
      body: JSON.stringify({ todo: val })
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
}
