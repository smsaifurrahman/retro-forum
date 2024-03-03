const getAllPosts = async () => {
    const res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts`);
    const data = await res.json();
    const allPosts = data.posts;
    displayEachPost(allPosts)
    console.log(allPosts[0]);
}

// Get all getElementBy ID
const postContainer = document.getElementById('post-container');
const markReadContainer = document.getElementById('markRead-container');



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
                            <button onclick="postAsRead('${eachPost.title}',${eachPost.view_count})">
                            <img src="./images/email 1.png" alt="">
                        </button>
                        
                        
                        
                            </div>
                        </div>

                        
                        </div>
            `;
            postContainer.appendChild(postCard);
            

        });
}


const postAsRead = (title,viewCount) => {
    
    const  markReadCard = document.createElement('div');
    markReadCard.classList = 'card  bg-base-100 shadow-xl mb-4  p-4';
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
    console.log(title,viewCount)
}


getAllPosts()