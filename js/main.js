const createElemWithText = (elementType = "p", textContent = "", className = "") => {
    // Create the element using the specified tag name or the default ("p")
    const element = document.createElement(elementType);
    
    // Set the text content of the element
    element.textContent = textContent;

    // If a className is provided, add it to the element
    if (className) {
        element.className = className;
    }

    // Return the created element
    return element;
};

const createSelectOptions = (users) => {
    // Return undefined if no users data is provided
    if (!users) return;

    // Initialize an array to store the option elements
    const options = [];

    // Loop through each user in the data
    users.forEach(user => {
        // Create an option element
        const option = document.createElement("option");

        // Assign the user's ID to the option's value
        option.value = user.id;

        // Assign the user's name to the option's textContent
        option.textContent = user.name;

        // Add the option element to the options array
        options.push(option);
    });

    // Return the array of option elements
    return options;
};



const toggleCommentSection = (postId) => {
    // Return undefined if no postId is provided
    if (!postId) return;

    // Select the section element with the data-post-id attribute equal to postId
    const section = document.querySelector(`section[data-post-id="${postId}"]`);

    // If the section doesn't exist, return null
    if (!section) return null;

    // Toggle the 'hide' class on the section element
    section.classList.toggle("hide");

    // Return the section element
    return section;
};

const toggleCommentButton = (postId) => {
    // Return undefined if no postId is provided
    if (!postId) return;

    // Select the button with the specified data-post-id attribute
    const button = document.querySelector(`button[data-post-id="${postId}"]`);

    // Return null if no button is found
    if (!button) {
        return null;
    }

    // Toggle the textContent using if-else
    if (button.textContent === 'Show Comments') {
        button.textContent = 'Hide Comments';
    } else if (button.textContent === 'Hide Comments') {
        button.textContent = 'Show Comments';
    }

    // Return the button element
    return button;
}

const deleteChildElements = (parentElement) => {
    if (!parentElement?.nodeType || !(parentElement instanceof HTMLElement)) return;
    let child = parentElement.lastElementChild;
    //while the child exist
    while (child) {
        //remove child element
        parentElement.removeChild(child);
        //reassign child to the last child of parentElement
        child = parentElement.lastElementChild;
    }
    //return the parentElement 
    return parentElement;
};

// Define a placeholder toggleComments function
const toggleComments = (event, postId) => {
    console.log(`Toggled comments for postId: ${postId}`);
    try {
        // Step c: Set listener property to true for testing purposes
        event.target.listener = true;

        // Step d: Call toggleCommentSection with postId
        const section = toggleCommentSection(postId);

        // Step f: Call toggleCommentButton with postId
        const button = toggleCommentButton(postId);

        // Step h: Return both elements as an array
        return [section, button];
    } catch (error) {
        console.error("Error in toggleComments:", error);
        return undefined;
    }
};

const addButtonListeners = () => {
 //select all buttons nested in main element
 const mainElem = document.querySelector("main");
 const buttons = mainElem.querySelectorAll("button");
 //loop if buttons exists
 if (buttons) {
    buttons.forEach(button => {
        const postId = button.dataset.postId;
        //if postId exists
        if (postId) {
            button.addEventListener("click", (event)=>{
                toggleComments(event, postId);
            });
        }
    });
 }
 return buttons;
};


const removeButtonListeners = () => {
    //select all buttons nested in main element
    const mainElem = document.querySelector("main");
    const buttons = mainElem?.querySelectorAll("button");
    //loop if buttons exists
    if (buttons) {
       buttons.forEach(button => {
           const postId = button.dataset.postId;
           //if postId exists
           if (postId) {
               button.removeEventListener("click", (event)=>{
                   toggleCommentSection(event, postId);
               });
           }
       });
    }
    return buttons;
   };



const createComments = (comments) => {
    // Return undefined if no comments data is provided
    if (!comments) return;

    // Create a document fragment
    const fragment = document.createDocumentFragment();

    // Loop through the comments
    comments.forEach(comment => {
        // Create an article element
        const article = document.createElement("article");

        // Create an h3 element with the comment name
        const h3 = createElemWithText("h3", comment.name);

        // Create a paragraph element with the comment body
        const bodyParagraph = createElemWithText("p", comment.body);

        // Create a paragraph element with the comment email
        const emailParagraph = createElemWithText("p", `From: ${comment.email}`);

        // Append the h3 and paragraphs to the article element
        article.appendChild(h3);
        article.appendChild(bodyParagraph);
        article.appendChild(emailParagraph);

        // Append the article element to the fragment
        fragment.appendChild(article);
    });

    // Return the fragment element
    return fragment;
};

const populateSelectMenu = (users) => {
    //check if array
    if(!Array.isArray(users)) return;

    // Select the #selectMenu element by id
    const selectMenu = document.getElementById("selectMenu");

    // Return undefined if the selectMenu element does not exist
    if (!selectMenu) return;

    // Pass users JSON data to createSelectOptions and get options array
    const options = createSelectOptions(users);

    // Loop through the options and append each to the select menu
    options.forEach(option => selectMenu.appendChild(option));

    // Return the selectMenu element
    return selectMenu;
};

const getUsers = async () => {
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users");
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const users = await response.json();
        return users; 
    } catch (error) {
        console.error("Failed", error);
        return;
    }
};

const getUserPosts = async (userId) => {
    try {
        if (!userId) return;

        const postData = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
        if (!postData.ok) {
            throw new Error(`HTTP error! Status: ${postData.status}`);
        }
        const userPost = await postData.json();
        return userPost;
    } catch(error) {
        console.error("Failed", error);
        return;
    }
};

const getUser = async (userId) => {
    try {
        if (!userId) return;
        //fetches data for a specific user ID
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const user = await response.json();
        return user;
    } catch(error) {
        console.error("Failed", error);
        return;
    }
};

const getPostComments = async (postId) => {
    try {
        if (!postId) return;
        //fetch comments for specific post ID
        const comments = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`);
        if (!comments.ok) {
            throw new Error(`HTTP error! Status: ${comments.status}`);
        }
        const postComments = await comments.json();
        return postComments;
    } catch(error) {
        console.error("Failed", error);
        return;
    }
};

const displayComments = async (postId) => {
   try {
    if (!postId) {
        throw new Error ("Invalid Entry");
    }
    //create section element
    const section = document.createElement("section");
    section.dataset.postId = postId;
    //adds the classes comments and hide to section element
    section.classList.add("comments", "hide");
    const comments = await getPostComments(postId);
    const fragment = createComments(comments);
    section.appendChild(fragment);
    return section;
     
   } catch (error)  {
    console.error("Error", error);
    return;
   }
};

const createPosts = async (posts) => {
    try {
        // Validate that posts data is provided
        if (!posts || !Array.isArray(posts)) {
            throw new Error("Invalid posts data provided.");
        }

        // Create a document fragment
        const fragment = document.createDocumentFragment();

        // Loop through the posts data
        for (const post of posts) {
            // Create an article element
            const article = document.createElement("article");

            // Create elements for post details
            const h2 = createElemWithText("h2", post.title);
            const bodyParagraph = createElemWithText("p", post.body);
            const postIdParagraph = createElemWithText("p", `Post ID: ${post.id}`);

            // Fetch the author data
            const author = await getUser(post.userId);

            // Create elements for author details
            const authorParagraph = createElemWithText(
                "p",
                `Author: ${author.name} with ${author.company.name}`
            );
            const catchPhraseParagraph = createElemWithText("p", author.company.catchPhrase);

            // Create a button element for comments
            const button = createElemWithText("button", "Show Comments");
            button.dataset.postId = post.id;

            // Fetch and create the comments section
            const section = await displayComments(post.id);

            // Append all elements to the article
            article.append(h2, bodyParagraph, postIdParagraph, authorParagraph, catchPhraseParagraph, button, section);

            // Append the article to the fragment
            fragment.appendChild(article);
        }

        // Return the fragment
        return fragment;
    } catch (error) {
        // Log the error and return undefined
        console.error("Error: ", error);
        return undefined;
    }
};



const displayPosts = async(postsData) => {
    try {
        if (!postsData) {
            throw new Error ("Invalid Entry");
        }
        //selects main element 
        const main = document.querySelector("main");
        //define the element variable 
        const element = postsData && postsData.length > 0
            ? await createPosts(postsData) //if post exists, create post element
            : document.querySelector(".default-text");
            main.appendChild(element);
            return element;
    } catch(error) {
        console.error("Error displaying posts:", error);
        return;
    }
};



const refreshPosts = async(posts) => {
    try {
        if (!posts) {
            throw new Error ("Invalid Entry");
        }
        //call removeButtonListeners
        const removeButtons = removeButtonListeners();
        //Call deleteChildElements with the main element as the parameter
        const main = document.querySelector("main");
        const deleteMain = deleteChildElements(main);
        //pass posts data to displayPosts and await the result
        const fragment = await displayPosts(posts);
        //call addButtonListeners and store its result
        const addButtons = addButtonListeners();
        //return array of results
        return [removeButtons, deleteMain, fragment, addButtons];
    } catch(error) {
        console.error("Error:", error);
        return;
    }
};



const selectMenuChangeEventHandler = async (event) => {
    try {
        //Check if the event is a change event; early return if not
        if (event?.type !== "change") return;

        //Assign userId
        const userId =
            event?.target?.value === "Employees" || !event?.target?.value
                ? 1
                : event?.target?.value;

        //Disable the select menu
        const selectMenu = event?.target;
        if (selectMenu) selectMenu.disabled = true;

        //Fetch posts for the given userId
        const posts = await getUserPosts(userId);

        //Refresh posts with the fetched posts
        const refreshPostsArray = await refreshPosts(posts);

        //Re-enable the select menu
        if (selectMenu) selectMenu.disabled = false;

        //Return the array of values
        return [userId, posts, refreshPostsArray];
    } catch (error) {
        console.error("Error:", error);
        return;
    }
};


  const initPage = async () => {
    try {
      //Fetch users
      const users = await getUsers();
      //Populate the select menu with the users data
      const select = populateSelectMenu(users);
      //Return an array with users JSON data and the select element
      return [users, select];
    } catch (error) {
      console.error("Error:", error);
    }
  };


  const initApp = async () => {
    try {
  //call initPage
  initPage();
  // select #selectMenu
  const selectMenu = document.getElementById("change",selectMenuChangeEventHandler);
    } catch(error) {
        console.error("Error: ", error);
    }
};

// Add an event listener to the document
document.addEventListener("DOMContentLoaded", initApp);
