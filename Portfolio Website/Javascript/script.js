$(document).ready(function () {
  // Like button functionality
  $(".like-btn").click(function () {
    const btn = $(this);
    if (btn.text() === "Like") {
      btn.text("Unlike");
    } else {
      btn.text("Like");
    }
  });

  // Handling flip-over effect for interests section
  $('.interest-container').on('click', function () {
    $(this).toggleClass('flip');
  });

  // Collaborate form functionality
  $("#submit-form").click(function (event) {
    event.preventDefault();

    const name = $("#name").val().trim();
    const email = $("#email").val().trim();
    const formError = $("#form-error");

    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (name === "" || email === "") {
      formError.text("Please complete all mandatory fields.").show();
      return;
    } else if (!emailPattern.test(email)) {
      formError.text("Please enter a valid email address.").show();
      return;
    } else {
      formError.hide();
    }

    $(".collaborate-form").html("<p>Details submitted successfully.</p>");
  });

  // Comment functionality
  $(".comment-btn").click(function () {
    const commentSection = $(this).closest(".project").find(".comment-section");
    if (commentSection.length === 0) {
      $(this).closest(".project").append(`
        <div class="comment-section">
          <textarea class="new-comment" placeholder="Add a comment"></textarea>
          <button class="add-comment">Add Comment</button>
        </div>
        <ul class="comments-list"></ul>
      `);
    }
  });

  // Add comment functionality
  $(document).on("click", ".add-comment", function () {
    const commentText = $(this).siblings(".new-comment").val();
    if (commentText) {
      const commentItem = $(`
        <li>
          <span class="comment-text">${commentText}</span>
          <button class="edit-comment">Edit</button>
          <button class="delete-comment">Delete</button>
        </li>
      `);
      $(this).closest(".project").find(".comments-list").append(commentItem);
      $(this).siblings(".new-comment").val("");
    }
  });

  // Edit comment functionality
  $(document).on("click", ".edit-comment", function () {
    const commentText = $(this).siblings(".comment-text");
    const newText = prompt("Edit your comment:", commentText.text());
    if (newText) {
      commentText.text(newText);
    }
  });

  // Delete comment functionality
  $(document).on("click", ".delete-comment", function () {
    $(this).parent().remove();
  });

  // Hamburger menu toggle
  $(".toggler").on("click", function () {
    $(".menu-wrap").toggleClass("active");
  });

  // Typewriter effect for heading elements
  function typeWriterEffect(element, text, speed, callback) {
    let index = 0;
    function type() {
      if (index < text.length) {
        element.innerHTML += text.charAt(index);
        index++;
        setTimeout(type, speed);
      } else if (callback) {
        callback();
      }
    }
    type();
  }
  
  const helloElement = document.getElementById("typewriter-hello");
  const zoeElement = document.getElementById("typewriter-text");

  if (helloElement && zoeElement) {
    typeWriterEffect(helloElement, "Hello there,", 100, function () {
      typeWriterEffect(zoeElement, "I’m Zoë.", 100);
    });
  }

  // Save for Later functionality
  const saveButtons = document.querySelectorAll(".save-btn");

  saveButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const projectTitle = this.getAttribute("data-project");
      saveProjectForLater(projectTitle);
    });
  });

  function saveProjectForLater(projectTitle) {
    let savedProjects =
      JSON.parse(sessionStorage.getItem("savedProjects")) || [];

    if (!savedProjects.includes(projectTitle)) {
      savedProjects.push(projectTitle);
      sessionStorage.setItem("savedProjects", JSON.stringify(savedProjects));
    }

    alert(
      `You have ${savedProjects.length} item(s) in your Save for Later folder.`
    );
  }

  // Display saved items functionality
  if (window.location.pathname.endsWith("saveditems.html")) {
    displaySavedItems();
  }

  function displaySavedItems() {
    const savedProjectsList = document.getElementById("savedProjectsList");
    const savedProjects =
      JSON.parse(sessionStorage.getItem("savedProjects")) || [];

    if (savedProjects.length > 0) {
      const ul = document.createElement("ul");
      savedProjects.forEach((project) => {
        const li = document.createElement("li");
        li.textContent = project;
        ul.appendChild(li);
      });
      savedProjectsList.appendChild(ul);
    } else {
      savedProjectsList.textContent = "No saved projects.";
    }
  }
});
