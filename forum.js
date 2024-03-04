const getAllPosts = async () => {
    loadingSpinner(true);

    await new Promise(resolve => setTimeout(resolve, 500));

  
    const res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts`);
    await new Promise(resolve => setTimeout(resolve, 500));
    const data = await res.json();
    const allPosts = data.posts;
    displayEachPost(allPosts);

}



// Get all getElementBy ID
const postContainer = document.getElementById('post-container');
const markReadContainer = document.getElementById('markRead-container');
let markReadCount = document.getElementById('markRead-count');
const latestPostContainer = document.getElementById('latest-post-container');
const loadSpinner = document.getElementById('loading-spinner');


// Function for loading spinner

const loadingSpinner = (isLoading) => {
    if(isLoading) {
     
            loadSpinner.classList.remove('hidden');  
        
    }
    else {

        // setTimeout(function() {
        //     // Your code to be executed after the delay
        //     loadSpinner.classList.add('hidden');
        // }, 2000);
        loadSpinner.classList.add('hidden');
        
        
    }
    
}

// function for getting eachPost data and displaying
const displayEachPost = (allPosts) => {
    
        allPosts.forEach(eachPost => {
            // const isActive = false;
            let indicatorColor;
            if(eachPost.isActive) {
                indicatorColor = 'bg-green-500'

            }
            else {
                indicatorColor = 'bg-red-500'
            }
            const postCard = document.createElement('div');
            postCard.classList ='card bg-[#F3F3F5] card-side  p-1 lg:p-8 mb-4';
            postCard.innerHTML = `
            
                            <div class="indicator mt-8  ">
                            <span  class="indicator-item badge ${indicatorColor}"></span> 
                            <div class="grid w-32 h-32 place-items-center">
                            <img src="${eachPost.image}"/>
                            </div>
                        </div>
                        <!-- <figure><img src=""/></figure> -->
                        <div class="card-body">
                            <div class="flex justify-around ">
                                <p class=""># <span>${eachPost.category}</span> </p>
                                <p class=" ml-0 lg:-ml-44">Author: <span>${eachPost.author.name}</span></p>
                            </div>
                        <h2 class="card-title">${eachPost.title}</h2>
                        <p>${eachPost.description}</p>
                        <hr>
                        <div class="flex justify-between mt-4">
                            <div class="flex gap-1 lg:gap-8">
                                <div class="flex items-center gap-0 lg:gap-3">
                                    <img src="./images/tabler-icon-message-2.png" alt="">
                                    <p>${eachPost.comment_count}</p>
                                </div>
                                <div class="flex items-center gap-0 lg:gap-3">
                                    <img src="./images/tabler-icon-eye.png" alt="">
                                    <p>${eachPost.view_count}</p>
                                </div>
                                <div class="flex items-center gap-0 lg:gap-3">
                                    <img src="./images/tabler-icon-clock-hour-9.png" alt="">
                                    <p><span>${eachPost.posted_time}</span> min</p>
                                </div>

                            </div>
                            <div>
                            <button onclick="postAsRead('${eachPost.title.replace("'", " ")}',${eachPost.view_count})">
                            <img src="./images/email 1.png" alt="">
                           </button>
                        
                        
                        
                            </div>
                        </div>

                        
                        </div>
            `;
            postContainer.appendChild(postCard);
            loadingSpinner(false);
            

        });
}

let count = 0
const postAsRead = (title,viewCount) => {
    count++;
    markReadCount.innerText = count
   

    const  markReadCard = document.createElement('div');
    markReadCard.classList = 'card  bg-base-100 shadow-xl mb-4 py-4 px-10';
    markReadCard.innerHTML = `
                            <div class="flex items-center justify-between">
                            <div class="">
                                <h2 class="card-title">${title}</h2>
                                <p></p>
                            </div>
                            <div class="flex items-center">
                                <img src="./images/tabler-icon-eye.png" alt="">
                                <p>${viewCount}</p>
                            </div>
                            
                        </div>
    
    `;
    markReadContainer.appendChild(markReadCard)
    
}





const searchByCategory = async () => {
        let ctgName = document.getElementById('input-value');
        const categoryNameAll = ctgName.value;
        const categoryName = categoryNameAll.toLowerCase();    
        
        if(categoryName !== 'coding' && categoryName !== 'comedy' && categoryName !== 'music') {
            ctgName.value = '';
            alert('Please Enter a valid Category');
           
            

        } else {
            postContainer.innerHTML = '';
       loadingSpinner(true);
       await new Promise(resolve => setTimeout(resolve, 500));
       
        const res = await fetch(` https://openapi.programming-hero.com/api/retro-forum/posts?category=${categoryName}`);
        await new Promise(resolve => setTimeout(resolve, 500));

        const data = await res.json();
        const post = data.posts;
        ctgName.value = '';
        // postContainer.innerHTML = '';

 
       
        
        
        displayEachPost(post); 
        loadingSpinner(false)
        }

    }
    // console.log(inputValue)

getAllPosts();


// function for fetching latest post
const getLatestPosts = async () => {
    
    const res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/latest-posts`);
    const data = await res.json();
    const posts = data;
  
    posts.forEach( (post) => {
        
        const postCard = document.createElement('div');
        postCard.classList = 'card  bg-base-100 shadow-xl p-6 border-2';
        postCard.innerHTML = `
                    <figure><img src="${post.cover_image}" alt="Shoes" /></figure>
                                <div class="flex gap-4 my-4">
                                        <img src="./images/Frame  date.png" alt="">
                                        <p>${post.author?.posted_date || 'No Publish date'}</p>
                                </div>
                                <h1 class="font-bold">${post.title}</h1>
                                <p class="my-4">${post.description}</p>
                                <div class="flex gap-4 items-center">
                                        <div>
                                             <img src="${post.profile_image}" alt="" class="w-16 h-16 rounded-full">
                                        </div>
                            
                                        <div>
                                            <p class="text-xl font-bold">${post.author.name}</p>
                                            <p>${post.author?.designation || 'Unknown'}</p>
                                        </div>
                                </div>
        `;
        latestPostContainer.appendChild(postCard);

    });

}
getLatestPosts()
// setTimeout(getAllPosts, 2000)
