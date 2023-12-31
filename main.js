const { createStore } = window.Redux;

// State
const initialState = JSON.parse(localStorage.getItem("hobby_list")) || [];

// Reducer
const hobbyReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_HOBBY": {
      const newList = [...state];
      newList.push(action.payload);
      return newList;
    }
    default:
      return state;
  }
};

// Store
const store = createStore(hobbyReducer);

// Function
const renderHobbyList = (hobbyList) => {
  if (!Array.isArray(hobbyList) || hobbyList.length === 0) return;

  const ulElement = document.querySelector("#hobbyListId");
  if (!ulElement) return;

  // Reset previous content of ul
  ulElement.innerHTML = "";
  for (const hobby of hobbyList) {
    const liElement = document.createElement("li");
    liElement.textContent = hobby;
    ulElement.appendChild(liElement);
  }
};
const hobbyFormElement = document.querySelector("#hobbyFormId");
if (hobbyFormElement) {
  const handleFormSubmit = (e) => {
    // prevent reload brower
    e.preventDefault();
    const hobbyTextElement = hobbyFormElement.querySelector("#hobbyTextId");
    if (!hobbyTextElement) return;
    const action = {
      type: "ADD_HOBBY",
      payload: hobbyTextElement.value,
    }; 
    // chạy đến hobbyReducer để xử lí action
    store.dispatch(action); 
    hobbyFormElement.reset();
  };

  hobbyFormElement.addEventListener("submit", handleFormSubmit);
}
// Render initial Hobby List
renderHobbyList(store.getState());
// Lắng nghe sự thay đổi state trong ở trong hàm hobbyReducer
store.subscribe(() => {
  const updatedHobbyList = store.getState();
  renderHobbyList(updatedHobbyList);
  localStorage.setItem("hobby_list", JSON.stringify(updatedHobbyList));
});
