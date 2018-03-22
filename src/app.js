import { http } from "./http";
import { ui } from "./UI";

// get POST on DOM load
document.addEventListener('DOMContentLoaded',getPosts);

// listen for a user to add a Post
document.querySelector('.post-submit').addEventListener('click',submitPost);

document.querySelector("#posts").addEventListener('click',deletePost);

document.querySelector("#posts").addEventListener('click',enableUpdate);


function getPosts(){
    http.get('http://localhost:3000/posts')
    .then(data => ui.showPosts(data))
    .catch(error => console.log(error))
}


function submitPost(){
    
        const title = document.querySelector('#title').value;
        const body = document.querySelector('#body').value;
        
    if(title === '' || body === ''){
        ui.showAlert("Pleaase Add Content","alert alert-danger");
    }else {
        const data = {
            title:title,
            body:body
        }
    // create post
        http.post('http://localhost:3000/posts',data)
        .then(data => {
            ui.showAlert("Post Added","alert alert-success");
            ui.clearFields();
            getPosts();
        })
        .catch(error => console.log(error));
    }



    const data = {
        title:title,
        body:body
    }
// create post
    http.post('http://localhost:3000/posts',data)
    .then(data => {
        ui.showAlert("Post Added","alert alert-success");
        ui.clearFields();
        getPosts();
    })
    .catch(error => console.log(error));
}

// Delete Post
function deletePost(e) {
    if(e.target.parentElement.classList.contains('delete')) {
      const id = e.target.parentElement.dataset.id;
      if(confirm('Are you sure?')) {
        http.delete(`http://localhost:3000/posts/${id}`)
          .then(data => {
            ui.showAlert('Post removed', 'alert alert-success');
            getPosts();
          })
          .catch(err => console.log(err));
      }
    }
    e.preventDefault();
  };

  function enableUpdate(e){
    if(e.target.parentElement.classList.contains('edit')){
        const id = e.target.parentElement.dataset.id;
        const body = e.target.parentElement.previousElementSibling.textContent;
        const title = e.target.parentElement.previousElementSibling.previousElementSibling.textContent;

        const data = {
            id:id,
            title:title,
            body:body
        }

        // fill form with current post to edit it
        ui.fillForm(data);
    }
    e.preventDefault();
  }