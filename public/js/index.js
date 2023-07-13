jalaliDatepicker.startWatch();

const tabs = document.querySelectorAll(".nav-pills .nav-item .nav-link");
const banner = document.getElementsByClassName("banner")[0];
let currentTab = document
    .querySelector(".nav-pills .nav-item .nav-link.active")
    .getAttribute("href");

const info = document.getElementById("info");
let flightResult = document.getElementById("flight-result");
let trainResult = document.getElementById("train-result");
let hotelResult = document.getElementById("hotel-result");

tabs.forEach(function (tab) {
    tab.addEventListener("click", function (event) {
        event.preventDefault();
        currentTab = this.getAttribute("href");

        const planeInfo = document.querySelector(".plane-ticket-info");
        const hotelInfo = document.querySelector(".hotel-reserve-info");
        const trainInfo = document.querySelector(".train-ticket-info");

        if (currentTab === "#pills-plane") {
            banner.src = "/img/flight.jpg";
            info.style.display = "block";
            planeInfo.style.display = "block";
            hotelInfo.style.display = "none";
            trainInfo.style.display = "none";
            flightResult.style.display = "none";
            trainResult.style.display = "none";
        } else if (currentTab === "#pills-hotel") {
            banner.src = "/img/hotel.jpg";
            info.style.display = "block";
            planeInfo.style.display = "none";
            hotelInfo.style.display = "block";
            trainInfo.style.display = "none";
            flightResult.style.display = "none";
            trainResult.style.display = "none";
        } else if (currentTab === "#pills-train") {
            banner.src = "/img/train.jpg";
            info.style.display = "block";
            planeInfo.style.display = "none";
            hotelInfo.style.display = "none";
            trainInfo.style.display = "block";
            flightResult.style.display = "none";
            trainResult.style.display = "none";
        }
    });
});

const flightBtn = document.getElementById("flight-search");
const trainBtn = document.getElementById("train-search");

const bookFlight = async (flightID, firstname, lastname, nationalCode, birthdate, gender) => {

    try {
        const res = await axios({
            method: 'POST',
            url: `http://127.0.0.1:3000/api/v1/flight-booking/`,
            data: {
                flight: flightID,
                firstname,
                lastname,
                nationalCode,
                birthdate,
                gender
            }
        });

        if (res.data.status === 'success') {
            alert('The flight was successfully booked.');
        }
    } catch (err) {
        alert(err.response.data.message);
    }
};


const bookTrain = async (trainID, firstname, lastname, nationalCode, birthdate, gender) => {

    try {
        const res = await axios({
            method: 'POST',
            url: `http://127.0.0.1:3000/api/v1/train-booking/`,
            data: {
                train: trainID,
                firstname,
                lastname,
                nationalCode,
                birthdate,
                gender
            }
        });

        if (res.data.status === 'success') {
            alert('The train was successfully booked.');
        }
    } catch (err) {
        alert(err.response.data.message);
    }
};


const getFlights = async (origin, destination, departingDate, returningDate, passengers) => {

    const departingDate2 = moment(departingDate, 'jYYYY/jMM/jDD').format('YYYY-MM-DD');
    const returningDate2 = moment(returningDate, 'jYYYY/jMM/jDD').format('YYYY-MM-DD');

    try {
        const res = await axios({
            method: 'GET',
            url: `http://127.0.0.1:3000/api/v1/flights/?origin=${origin}&destination=${destination}&departingDate=${departingDate2}&returningDate=${returningDate2}&capacity[gte]=${passengers}`,
        });

        if (res.data.status === 'success') {
            return res.data.data;
        }
    } catch (err) {
        alert(err.response.data.message);
    }
};

const getTrains = async (origin, destination, departingDate, returningDate, passengers) => {

    const departingDate2 = moment(departingDate, 'jYYYY/jMM/jDD').format('YYYY-MM-DD');
    const returningDate2 = moment(returningDate, 'jYYYY/jMM/jDD').format('YYYY-MM-DD');

    try {
        const res = await axios({
            method: 'GET',
            url: `http://127.0.0.1:3000/api/v1/trains/?origin=${origin}&destination=${destination}&departingDate=${departingDate2}&returningDate=${returningDate2}&capacity[gte]=${passengers}`,
        });

        if (res.data.status === 'success') {
            return res.data.data;
        }
    } catch (err) {
        alert(err.response.data.message);
    }
};


async function handleFlightCards(e) {
    e.preventDefault();

    let originFlight = document.getElementById("plane-origin-city").value;
    let destFlight = document.getElementById("plane-dest-city").value;
    let startDateFlight = document.getElementById("plane-start-date").value;
    let endDateFlight = document.getElementById("plane-end-date").value;
    let planeGuest = document.getElementById("plane-guest").value;

    if (currentTab === "#pills-plane") {
        if (
            !!originFlight &&
            !!destFlight &&
            !!startDateFlight &&
            !!endDateFlight &&
            !!planeGuest
        ) {
            info.style.display = "none";
            flightResult.style.display = "flex";

            const flights = await getFlights(originFlight, destFlight, startDateFlight, endDateFlight, planeGuest);

            flights.forEach((flight) => {
                const card = document.createElement("div");
                const collapseId = `flight-info-collapse-${flight.id}`;
                card.innerHTML = `
                <div class="ticket">
                <div class="ticket__right-section">
                    <div class="ticket__right-section--top">
                        <div class="flight-airport">    
                        </div>
                        <div class="flight-info">
                            <div class="flight-details">
                                <div class="flight-place__origin">
                                    <span class="flight-place__origin-location flight-details-location">
                                       ${flight.origin}
                                    </span>
                                    <span class="flight-place__origin-time flight-details-time">
                                         ${flight.departingTime}
                                    </span>
                                </div>
                                <div class="seperator">
                                    <svg class="plane-svg" width="15px" height="15px" fill="#bec6cc" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><title>ionicons-v5-a</title><path d="M407.72,208c-2.72,0-14.44.08-18.67.31l-57.77,1.52L198.06,48H135.25l74.59,164.61-97.31,1.44L68.25,160H16.14l20.61,94.18c.15.54.33,1.07.53,1.59a.26.26,0,0,1,0,.15,15.42,15.42,0,0,0-.53,1.58L15.86,352H67.64l45.45-55,96.77,2.17L135.24,464h63l133-161.75,57.77,1.54c4.29.23,16,.31,18.66.31,24.35,0,44.27-3.34,59.21-9.94C492.22,283,496,265.46,496,256,496,225.94,463,208,407.72,208Zm-71.29,87.9v0Z"/></svg>
                                    <div class="line"></div>
                                    <div class="circle"></div>
                                </div>
                                <div class="flight-place__destination">
                                    <span class="flight-place__destination-location flight-details-location">
                                         ${flight.destination}
                                    </span>
                                    <span class="flight-place__destination-time flight-details-time">
                                         ${flight.returningTime}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="ticket__right-section--bottom">
                        <button class="btn btn-primary flight-info-btn" data-bs-toggle="collapse" data-bs-target="#${collapseId}">
                            اطلاعات پرواز
                        </button>
                    </div>
                </div>
                <div class="ticket__left-section">
                    <div class="ticket__price">
                        <span class="ticket__price-amount">
                            ${flight.price}
                        </span>
                        <span class="ticket__price-currency">
                            ریال
                        </span>
                    </div>
                    <button class="flightTicket__reserve-btn" reserve-id="${flight._id}">
                            انتخاب پرواز
                    </button>
                </div>        
                </div>        
                <div id="${collapseId}" class="collapse">
                  <div class="collapse-info">
                    <div class="container border rounded">
                      <div class="row p-4">
                        <div class="col-md-3 text-center">
                          <p>شماره پرواز</p>
                           <p>${flight.flightNumber}</p>
                        </div>
                        <div class="col-md-3 text-center">
                          <p> ترمینال</p>
                           <p>${flight.terminal}</p>
                        </div>
                        <div class="col-md-3 text-center">
                          <p> مقدار بار مجاز</p>
                           <p>${flight.loadAmount}</p>
                        </div>
                        <div class="col-md-3 text-center">
                          <p>پرواز</p>
                           <p>${flight.type}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                `;
                flightResult.appendChild(card);
            });


            const addToCartBtns = document.querySelectorAll(".flightTicket__reserve-btn");
            addToCartBtns.forEach(function (btn) {
                btn.addEventListener("click", function () {
                    let flightID = btn.getAttribute("reserve-id");

                    let flightObj = flights.find((f) => f._id === flightID);
                    const flightDetails = `
          <div class="ticket__right-section">
          <div class="ticket__right-section--top">
              <div class="flight-airport">    
              </div>
              <div class="flight-info">
                  <div class="flight-details">
                      <div class="flight-place__origin">
                          <span class="flight-place__origin-location flight-details-location">
                             ${flightObj.origin}
                          </span>
                          <span class="flight-place__origin-time flight-details-time">
                               ${flightObj.departingTime}
                          </span>
                      </div>
                      <div class="seperator">
                          <svg class="plane-svg" width="15px" height="15px" fill="#bec6cc" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><title>ionicons-v5-a</title><path d="M407.72,208c-2.72,0-14.44.08-18.67.31l-57.77,1.52L198.06,48H135.25l74.59,164.61-97.31,1.44L68.25,160H16.14l20.61,94.18c.15.54.33,1.07.53,1.59a.26.26,0,0,1,0,.15,15.42,15.42,0,0,0-.53,1.58L15.86,352H67.64l45.45-55,96.77,2.17L135.24,464h63l133-161.75,57.77,1.54c4.29.23,16,.31,18.66.31,24.35,0,44.27-3.34,59.21-9.94C492.22,283,496,265.46,496,256,496,225.94,463,208,407.72,208Zm-71.29,87.9v0Z"/></svg>
                          <div class="line"></div>
                          <div class="circle"></div>
                      </div>
                      <div class="flight-place__destination">
                          <span class="flight-place__destination-location flight-details-location">
                               ${flightObj.destination}
                          </span>
                          <span class="flight-place__destination-time flight-details-time">
                               ${flightObj.returningTime}
                          </span>
                      </div>
                  </div>
              </div>
          </div>
          <hr/>
          <div class="row justify-content-center"> 
            <div class="col-md-3">
              <div class="form-group">
                <label for="name">نام:</label>
                <input type="text" class="form-control" id="name">
              </div>
            </div>
            <div class="col-md-3">
              <div class="form-group">
                <label for="family-name">نام خانوادگی:</label>
                <input type="text" class="form-control" id="family-name">
              </div>
            </div>
            <div class="col-md-3">
              <div class="form-group">
                <label for="sex">جنسیت:</label>
                <select class="form-control" id="sex">
                  <option>مرد</option>
                  <option>زن</option>
                </select>
              </div>
            </div>
            <div class="col-md-3">
              <div class="form-group">
                <label for="national-code"> کد ملی:</label>
                <input type="number" class="form-control" id="national-code">
              </div>
            </div>
            <div class="col-md-3">
              <div class="form-group">
                <label for="birthDate">تاریخ تولد :</label>
                <input data-jdp class="form-control" id="birthDate">
              </div>
            </div>
          </div>
        </div>
          `;

                    const modalContent = document.querySelector("#myModal .modal-body");
                    for (let i = 0; i < planeGuest; i++) {
                        modalContent.innerHTML += flightDetails;
                    }
                    modalContent.innerHTML += `<div class="row justify-content-center">
                                                    <p class="mr-3"></p>
                                                    <button class="btn btn-success" id="reserve-btn">ثبت</button>
                                                </div>`;
                    $('#myModal').modal('show');


                    const user_firstnames = document.querySelectorAll('#name');
                    const user_lastnames = document.querySelectorAll('#family-name');
                    const user_genders = document.querySelectorAll('#sex');
                    const user_nationalCodes = document.querySelectorAll('#national-code');
                    const user_birthdates = document.querySelectorAll('#birthDate');
                    document.getElementById('reserve-btn').addEventListener('click', function () {

                        for (let i = 0; i < planeGuest; i++) {
                            bookFlight(
                                flightObj._id,
                                user_firstnames[i].value,
                                user_lastnames[i].value,
                                user_nationalCodes[i].value,
                                moment(user_birthdates[i].value, 'jYYYY/jMM/jDD').format('YYYY-MM-DD'),
                                user_genders[i].value
                            );

                        }
                    });
                });


            });

            const collapseButtons = document.getElementsByClassName("flight-info-btn");
            Array.from(collapseButtons).forEach((button) => {
                button.addEventListener("click", function () {
                    const collapseId = button.getAttribute("data-bs-target");
                    const collapse = document.querySelector(collapseId);
                    if (collapse.classList.contains("show")) {
                        collapse.classList.remove("show");
                    } else {
                        collapse.classList.add("show");
                    }
                });
            });

        }
    }
}

flightBtn.addEventListener("click", handleFlightCards);

////////////////////////////////////////////////////////////////////////////////////////////////////////

async function handleTrainCards(e) {
    e.preventDefault();

    let originTrain = document.getElementById("train-origin-city").value;
    let destTrain = document.getElementById("train-dest-city").value;
    let startDateTrain = document.getElementById("train-start-date").value;
    let endDateTrain = document.getElementById("train-end-date").value;
    let trainGuest = document.getElementById("train-guest").value;

    if (currentTab === "#pills-train") {
        if (
            !!originTrain &&
            !!destTrain &&
            !!startDateTrain &&
            !!endDateTrain &&
            !!trainGuest
        ) {
            info.style.display = "none";
            trainResult.style.display = "flex";

            const trains = await getTrains(originTrain, destTrain, startDateTrain, endDateTrain, trainGuest);

            trains.forEach((train) => {
                const card = document.createElement("div");
                const collapseId = `flight-info-collapse-${train.id}`;
                card.innerHTML = `
                <div class="ticket">
                <div class="ticket__right-section">
                    <div class="ticket__right-section--top">
                        <div class="flight-airport">    
                            <div class="flight-airport__name">
                                
                            </div>
                        </div>
                        <div class="flight-info">
                            <div class="flight-details">
                                <div class="flight-place__origin">
                                    <span class="flight-place__origin-location flight-details-location">
                                      ${train.origin}
                                    </span>
                                    <span class="flight-place__origin-time flight-details-time">
                                        ${train.departingTime}
                                    </span>
                                </div>
                                <div class="seperator">
                                   <svg viewBox="0 0 24 24" width="1rem" height="1rem" fill="currentColor" data-v-3edce143=""><path d="M17.188 16.895a1.064 1.064 0 0 1 1.281.285l.065.088 3.408 5.114.062.112c.222.47.067 1.037-.37 1.329a1.061 1.061 0 0 1-1.406-.214l-.065-.088-3.408-5.114-.061-.112a1.056 1.056 0 0 1 .37-1.329l.124-.071Zm-10.52.241c.35-.386.933-.461 1.394-.153l.1.08c.352.32.448.837.22 1.283l-.057.094-3.41 5.113-.08.1c-.348.386-.93.46-1.368.17a1.061 1.061 0 0 1-.344-1.38l.057-.094 3.41-5.113.079-.1Zm2.07 4.363 7.663.001.116.009c.521.07.914.517.914 1.047 0 .536-.402.987-.958 1.05l-.11.006-7.663-.001-.116-.009a1.056 1.056 0 0 1-.914-1.046c0-.537.403-.988.958-1.052l.11-.005Zm1.699-3.86h4.238l.143.01c.52.07.913.516.913 1.046 0 .536-.402.987-.957 1.051l-.11.005H10.4l-.117-.01a1.056 1.056 0 0 1-.913-1.046c0-.536.402-.988.957-1.051l.11-.006ZM16.799 0a4.249 4.249 0 0 1 4.25 4.249v9.347a2.55 2.55 0 0 1-2.55 2.55H6.602a2.55 2.55 0 0 1-2.55-2.55V4.25A4.249 4.249 0 0 1 8.303 0H16.8ZM8.157 10.465h-.28a1.309 1.309 0 0 0 0 2.617h.28a1.309 1.309 0 1 0 0-2.617Zm9.16 0h-.28a1.309 1.309 0 1 0 0 2.617h.28a1.309 1.309 0 0 0 0-2.617ZM15.1 2.549H10l-.099.006a.85.85 0 0 0 .1 1.694H15.1l.099-.006a.85.85 0 0 0-.1-1.694Z" fill-rule="evenodd"></path></svg> 
                                   <div class="line"></div>
                                   <div class="circle"></div>
                                </div>
                                <div class="flight-place__destination">
                                    <span class="flight-place__destination-location flight-details-location">
                                        ${train.destination}
                                    </span>
                                    <span class="flight-place__destination-time flight-details-time">
                                        ${train.returningTime}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="ticket__right-section--bottom">
                    <button class="btn btn-primary train-info-btn" data-bs-toggle="collapse" data-bs-target="#${collapseId}">
                    اطلاعات قطار
                        </button>
                    </div>
                </div>
                <div class="ticket__left-section">
                    <div class="ticket__price">
                        <span class="ticket__price-amount">
                            ${train.price}
                        </span>
                        <span class="ticket__price-currency">
                            ریال
                        </span>
                    </div>
                    <button class="trainTicket__reserve-btn" reserve-id="${train._id}">
                            انتخاب بلیط
                    </button>
                    <div class="ticket__reserve-hint">
                    <span>
                        ${train.capacity} صندلی باقی مانده
                    </span>
                </div>
                </div>        
                </div>        
                <div id="train-info-collapse" class="collapse">
                  <div id="${collapseId}" class="collapse">
                    <div class="container border rounded">
                      <div class="row p-4">
                        <div class="col-md-4 text-center">
                          <p> شماره قطاز</p>
                          <p>${train.trainNumber}</p>
                        </div>
                        <div class="col-md-4 text-center">
                          <p> ظرفیت قطار</p>
                          <p>${train.capacity}</p>
                        </div>
                        <div class="col-md-4 text-center">
                          <p> نوع کوپه</p>
                          <p>${train.type}</p>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-md-6">
                          <p>امکانات کوپه</p>
                          <p>${train.coupeFeatures} </p>
                        </div>
                        <div class="col-md-6">
                        <p>امکانات عمومی قطار </p>
                        <p> ${train.trainFeatures}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                `;
                trainResult.appendChild(card);
            });

            const collapseButtons = document.getElementsByClassName("train-info-btn");
            Array.from(collapseButtons).forEach((button) => {
                button.addEventListener("click", function () {
                    const collapseId = button.getAttribute("data-bs-target");
                    const collapse = document.querySelector(collapseId);
                    if (collapse.classList.contains("show")) {
                        collapse.classList.remove("show");
                    } else {
                        collapse.classList.add("show");
                    }
                });
            });

            const addToCartBtns = document.querySelectorAll(".trainTicket__reserve-btn");
            addToCartBtns.forEach(function (btn) {
                btn.addEventListener("click", function () {
                    let trainID = btn.getAttribute("reserve-id");

                    let trainObj = trains.find((f) => f._id === trainID);
                    console.log(trainObj);
                    const trainDetails = `
          <div class="ticket__right-section">
          <div class="ticket__right-section--top">
              <div class="flight-airport">    
              </div>
              <div class="flight-info">
                  <div class="flight-details">
                      <div class="flight-place__origin">
                          <span class="flight-place__origin-location flight-details-location">
                             ${trainObj.origin}
                          </span>
                          <span class="flight-place__origin-time flight-details-time">
                               ${trainObj.departingTime}
                          </span>
                      </div>
                      <div class="seperator">
                          <svg class="plane-svg" width="15px" height="15px" fill="#bec6cc" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><title>ionicons-v5-a</title><path d="M407.72,208c-2.72,0-14.44.08-18.67.31l-57.77,1.52L198.06,48H135.25l74.59,164.61-97.31,1.44L68.25,160H16.14l20.61,94.18c.15.54.33,1.07.53,1.59a.26.26,0,0,1,0,.15,15.42,15.42,0,0,0-.53,1.58L15.86,352H67.64l45.45-55,96.77,2.17L135.24,464h63l133-161.75,57.77,1.54c4.29.23,16,.31,18.66.31,24.35,0,44.27-3.34,59.21-9.94C492.22,283,496,265.46,496,256,496,225.94,463,208,407.72,208Zm-71.29,87.9v0Z"/></svg>
                          <div class="line"></div>
                          <div class="circle"></div>
                      </div>
                      <div class="flight-place__destination">
                          <span class="flight-place__destination-location flight-details-location">
                               ${trainObj.destination}
                          </span>
                          <span class="flight-place__destination-time flight-details-time">
                               ${trainObj.returningTime}
                          </span>
                      </div>
                  </div>
              </div>
          </div>
          <hr/>
          <div class="row justify-content-center"> 
            <div class="col-md-3">
              <div class="form-group">
                <label for="name">نام:</label>
                <input type="text" class="form-control" id="name">
              </div>
            </div>
            <div class="col-md-3">
              <div class="form-group">
                <label for="family-name">نام خانوادگی:</label>
                <input type="text" class="form-control" id="family-name">
              </div>
            </div>
            <div class="col-md-3">
              <div class="form-group">
                <label for="sex">جنسیت:</label>
                <select class="form-control" id="sex">
                  <option>مرد</option>
                  <option>زن</option>
                </select>
              </div>
            </div>
            <div class="col-md-3">
              <div class="form-group">
                <label for="national-code"> کد ملی:</label>
                <input type="number" class="form-control" id="national-code">
              </div>
            </div>
            <div class="col-md-3">
              <div class="form-group">
                <label for="birthDate">تاریخ تولد :</label>
                <input data-jdp class="form-control" id="birthDate">
              </div>
            </div>
          </div>
        </div>
          `;
                    const modalContent = document.querySelector("#myModal .modal-body");
                    for (let i = 0; i < trainGuest; i++) {
                        modalContent.innerHTML += trainDetails;
                    }
                    $('#myModal').modal('show');

                    modalContent.innerHTML += ` <div class="row justify-content-center">
                                                    <p class="mr-3"></p>
                                                    <button class="btn btn-success" id="reserve-btn">ثبت</button>
                                                </div>`;

                    const user_firstnames = document.querySelectorAll('#name');
                    const user_lastnames = document.querySelectorAll('#family-name');
                    const user_genders = document.querySelectorAll('#sex');
                    const user_nationalCodes = document.querySelectorAll('#national-code');
                    const user_birthdates = document.querySelectorAll('#birthDate');
                    document.getElementById('reserve-btn').addEventListener('click', function () {

                        for (let i = 0; i < trainGuest; i++) {
                            bookTrain(
                                trainObj._id,
                                user_firstnames[i].value,
                                user_lastnames[i].value,
                                user_nationalCodes[i].value,
                                moment(user_birthdates[i].value, 'jYYYY/jMM/jDD').format('YYYY-MM-DD'),
                                user_genders[i].value
                            );
                        }
                    });
                });
            });
        }
    }
}

trainBtn.addEventListener("click", handleTrainCards);
