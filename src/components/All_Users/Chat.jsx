import 'bootstrap/dist/css/bootstrap.min.css';

function Chat() {
    return (
        <>
            <section >
                <div class="container py-5">
            
                <div class="row">
                    <div class="col-md-12">
            
                    <div class="card" id="chat3" >
                        <div class="card-body">
            
                        <div class="row">
                            <div class="col-md-6 col-lg-5 col-xl-4 mb-4 mb-md-0">
            
                            <div class="p-3">
            
                                <div class="input-group rounded mb-3">
                                    <input type="search" class="form-control rounded" placeholder="Search" aria-label="Search"
                                        aria-describedby="search-addon" />
                                </div>
            
                                <div data-mdb-perfect-scrollbar-init >
                                        {/* users list */}
                                    <ul class="list-unstyled mb-0">
                                        <li class="p-2 border-bottom">
                                            <a href="#!" class="d-flex justify-content-between">
                                                <div class="d-flex flex-row">
                                                <div>
                                                    <img
                                                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                                                    alt="avatar" class="d-flex align-self-center me-3" width="60"/>
                                                    <span class="badge bg-success badge-dot"></span>
                                                </div>
                                                <div class="pt-1">
                                                    <p class="fw-bold mb-0">Marie Horwitz</p>
                                                    <p class="small text-muted">Hello, Are you there?</p>
                                                </div>
                                                </div>
                                                    <div class="pt-1">
                                                    <p class="small text-muted mb-1">Just now</p>
                                                    <span class="badge bg-danger rounded-pill float-end">3</span>
                                                </div>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
            
                            </div>
            
                            <div class="col-md-6 col-lg-7 col-xl-8">
                                {/* messege */}
                                <div class="pt-3 pe-3" data-mdb-perfect-scrollbar-init>
                                    <div class="d-flex flex-row justify-content-start">
                                    <img className="photo" src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava6-bg.webp"
                                        alt="avatar 1" />
                                    <div>
                                        <p class="small p-2 ms-3 mb-1 rounded-3 bg-body-tertiary">Lorem ipsum
                                        dolor
                                        sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                                        dolore
                                        magna aliqua.</p>
                                        <p class="small ms-3 mb-3 rounded-3 text-muted float-end">12:00 PM | Aug 13</p>
                                    </div>
                                    </div>
                
                                    <div class="d-flex flex-row justify-content-end">
                                    <div>
                                        <p class="small p-2 me-3 mb-1 text-white rounded-3 bg-primary">Ut enim ad minim veniam,
                                        quis
                                        nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                                        <p class="small me-3 mb-3 rounded-3 text-muted">12:00 PM | Aug 13</p>
                                    </div>
                                    <img className="photo" src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                                        alt="avatar 1" />
                                    </div>
                                </div>
                

                                {/* input */}
                                <div class="text-muted d-flex justify-content-start align-items-center pe-3 pt-3 mt-2">             
                                    <img className="photo" src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava6-bg.webp"
                                    alt="avatar 3" />
                                    <input type="text" class="form-control form-control-lg" id="exampleFormControlInput2"
                                    placeholder="Type message"/>
                                    <a class="ms-1 text-muted" href="#!"><i class="fas fa-paperclip"></i></a>
                                    <a class="ms-3 text-muted" href="#!"><i class="fas fa-smile"></i></a>
                                    <a class="ms-3" href="#!"><i class="fas fa-paper-plane"></i></a>
                                </div>
            
                            </div>
                        </div>
            
                        </div>
                    </div>
            
                    </div>
                </div>
            
                </div>
            </section>
        </>
    )
}

export default Chat