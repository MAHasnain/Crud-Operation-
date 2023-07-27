// var selectedRow = null;

// function showAlert(message, className) {
//  const div = document.createElement("div");
//  div.className = `alert alert-${className}`;

//  div.appendChild(document.createTextNode(message));
//  const container = document.querySelector(".container");
//  const main = document.querySelector(".main");
//  container.insertBefore(div, main);

//  setTimeout(() => document.querySelector(".alert").remove(), 3000);
// }

// function clearFields() {
//  document.querySelector("#productname").value = "";
//  document.querySelector("#productprice").value = "";
//  document.querySelector("#productdescription").value = "";
// }

// document.querySelector("#product-list").addEventListener("submit", (e) => {
//  e.preventDefault();

//  const productName = document.querySelector("#productname").value;
//  const productPrice = document.querySelector("#productprice").value;
//  const productDescription = document.querySelector("#productdescription").value;

//  if (productName == "" || productPrice == "" || productDescription == "") {
//   showAlert("All fields are required", "danger");
//  } else {
//   if (selectedRow == null) {
//    const list = document.querySelector("#product-list");
//    const row = document.createElement("tr");

//    row.innerHTML = `
//       <td>${productName}</td>
//       <td>${productPrice}</td>
//       <td>${productDescription}</td>
//       <td>
//         <a href="#" class="btn btn-warning btn-sm edit">Edit</a>
//         <a href="#" class="btn btn-danger btn-sm delete">Delete</a>
//       </td>
//       `;
//    list.appendChild(row);
//    selectedRow = null;
//    showAlert("Product added successfully", "success");
//   } else {
//    selectedRow.children[0].innerHTML = productName;
//    selectedRow.children[1].innerHTML = productPrice;
//    selectedRow.children[2].innerHTML = productDescription;
//    selectedRow = null;
//    showAlert("Product updated successfully", "success");
//   }

//   clearFields();
//  }
// });

// document.querySelector("#product-list").addEventListener("click", (e) => {
//  target = e.target;

//  if (target.classlist.contains("edit")) {
//   selectedRow = target.parentElement.parentElement;
//   document.querySelector("#productname").value =
//    selectedRow.children[0].textContent;
//   document.querySelector("#productprice").value =
//    selectedRow.children[1].textContent;
//   document.querySelector("#productdescription").value =
//    selectedRow.children[2].textContent;
//  }
// });

// document.querySelector("#product-list").addEventListener("click", (e) => {
//  target = e.target;
//  if (target.classlist.contains("delete")) {
//   target.parentElement.parentElement.remove();
//   showAlert("Product deleted successfully", "danger");
//  }
// });
