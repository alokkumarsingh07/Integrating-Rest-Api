var url = "https://crudcrud.com/api/1459cc7c577043daab6d71ce39e189e4";

function addItem(event) {
  event.preventDefault();
  const name = document.getElementById("des").value;
  const price = document.getElementById("amt").value;
  const cat = document.querySelector("#cat-val").value;

  let obj = {
    price,
    name,
    cat,
  };

  axios
    .post(`${url}/products`, obj)
    .then((respond) => showProduct(respond.data, `${cat}`))
    .catch((err) => console.log(err));

  document.getElementById("myForm").reset();
}

window.addEventListener("DOMContentLoaded", () => {
  axios
    .get(`${url}/products`)
    .then((respond) => {
      for (let i = 0; i < respond.data.length; i++) {
        let cat = respond.data[i].cat;
        showProduct(respond.data[i], `${cat}`);
      }
    })
    .catch((err) => console.log(err));
});

function deleteTask(e) {
  if (confirm("Are You Sure?")) {
    var id = e.target.value;
    var li = e.target.parentElement;
    var list = li.parentElement;
    var listId = list.getAttribute("id");

    var baseUrl = `${url}/products`;

    axios
      .delete(`${url}/products/${id}`)
      .then((deleteResponse) => {
        return deleteResponse;
      })
      .then((response) => {
        var list = document.getElementById(listId);
        list.removeChild(li);
      })
      .catch((deleteError) => {
        console.log(deleteError);
      });
  }
}

function showProduct(obj, cat) {
  const name = obj.name;
  const price = obj.price;

  const id = obj._id;

  const val = price + " - " + cat + "  -  " + name;

  var list;

  if (cat === "Electronics") {
    list = document.getElementById("elec");
  }
  if (cat === "Food") {
    list = document.getElementById("food");
  }
  if (cat === "Skin Care") {
    list = document.getElementById("skin");
  }

  var li = document.createElement("li");
  li.appendChild(document.createTextNode(val));

  var deleteBtn = document.createElement("button");
  deleteBtn.onclick = deleteTask;
  deleteBtn.appendChild(document.createTextNode("Delete Product"));
  deleteBtn.value = `${id}`;
  deleteBtn.className = "btn btn-primary";
  deleteBtn.style.color = "white";
  deleteBtn.style.background = "red";
  deleteBtn.style.marginLeft = "7px";
  li.appendChild(deleteBtn);

  li.style.padding = "5px";
  list.appendChild(li);
}
