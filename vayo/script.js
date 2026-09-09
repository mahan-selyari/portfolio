// =====================================================
// VAYO — Travel Booking Platform
// =====================================================


// =====================================================
// ELEMENTS
// =====================================================

const html = document.documentElement;

const themeBtn = document.getElementById("themeBtn");

const mobileMenuBtn =
    document.getElementById("mobileMenuBtn");

const mobileMenu =
    document.getElementById("mobileMenu");

const guestBtn =
    document.getElementById("guestBtn");

const guestPopup =
    document.getElementById("guestPopup");

const guestNumber =
    document.getElementById("guestNumber");

const guestText =
    document.getElementById("guestText");

const minusGuest =
    document.getElementById("minusGuest");

const plusGuest =
    document.getElementById("plusGuest");

const searchBtn =
    document.getElementById("searchBtn");

const destinationInput =
    document.getElementById("destinationInput");

const resultMessage =
    document.getElementById("resultMessage");

const propertyGrid =
    document.getElementById("propertyGrid");

const propertyCards =
    document.querySelectorAll(".property-card");

const filterButtons =
    document.querySelectorAll(".filter-btn");

const favoriteButtons =
    document.querySelectorAll(".favorite");

const favoriteCount =
    document.getElementById("favoriteCount");

const themeStorageKey =
    "vayo-theme";

const favoriteStorageKey =
    "vayo-favorites";


// =====================================================
// THEME
// =====================================================

const savedTheme =
    localStorage.getItem(themeStorageKey);


if (savedTheme === "dark") {

    html.classList.add("dark");

    themeBtn.textContent = "☾";

} else {

    html.classList.remove("dark");

    themeBtn.textContent = "☼";

}


themeBtn.addEventListener("click", () => {

    html.classList.toggle("dark");

    const dark =
        html.classList.contains("dark");

    localStorage.setItem(
        themeStorageKey,
        dark ? "dark" : "light"
    );

    themeBtn.textContent =
        dark ? "☾" : "☼";

});


// =====================================================
// MOBILE MENU
// =====================================================

mobileMenuBtn.addEventListener(
    "click",
    () => {

        mobileMenu.classList.toggle("hidden");

    }
);


mobileMenu
    .querySelectorAll("a")
    .forEach(link => {

        link.addEventListener(
            "click",
            () => {

                mobileMenu.classList.add(
                    "hidden"
                );

            }
        );

    });


// =====================================================
// GUEST COUNTER
// =====================================================

let guests = 2;


function updateGuests() {

    guestNumber.textContent =
        guests;

    guestText.textContent =
        `${guests} ${guests === 1 ? "guest" : "guests"}`;

}


guestBtn.addEventListener(
    "click",
    event => {

        event.stopPropagation();

        guestPopup.classList.toggle(
            "hidden"
        );

    }
);


plusGuest.addEventListener(
    "click",
    () => {

        if (guests < 12) {

            guests++;

            updateGuests();

        }

    }
);


minusGuest.addEventListener(
    "click",
    () => {

        if (guests > 1) {

            guests--;

            updateGuests();

        }

    }
);


document.addEventListener(
    "click",
    event => {

        if (
            !guestPopup.contains(event.target) &&
            !guestBtn.contains(event.target)
        ) {

            guestPopup.classList.add(
                "hidden"
            );

        }

    }
);


// =====================================================
// DATE HELPERS
// =====================================================

const today =
    new Date().toISOString().split("T")[0];


const checkIn =
    document.getElementById("checkIn");

const checkOut =
    document.getElementById("checkOut");

const modalCheckIn =
    document.getElementById("modalCheckIn");

const modalCheckOut =
    document.getElementById("modalCheckOut");


checkIn.min = today;
checkOut.min = today;

modalCheckIn.min = today;
modalCheckOut.min = today;


checkIn.addEventListener(
    "change",
    () => {

        checkOut.min =
            checkIn.value || today;

    }
);


modalCheckIn.addEventListener(
    "change",
    () => {

        modalCheckOut.min =
            modalCheckIn.value || today;

        calculatePrice();

    }
);


modalCheckOut.addEventListener(
    "change",
    calculatePrice
);


// =====================================================
// SEARCH
// =====================================================

searchBtn.addEventListener(
    "click",
    () => {

        const destination =
            destinationInput.value
                .trim()
                .toLowerCase();


        const checkInValue =
            checkIn.value;

        const checkOutValue =
            checkOut.value;


        if (
            checkInValue &&
            checkOutValue &&
            checkOutValue <= checkInValue
        ) {

            showToast(
                "Check-out must be after check-in."
            );

            return;

        }


        let visible = 0;


        propertyCards.forEach(card => {

            const location =
                card.dataset.location
                    .toLowerCase();


            const matches =
                !destination ||
                location.includes(destination);


            if (matches) {

                card.classList.remove(
                    "hidden"
                );

                visible++;

            } else {

                card.classList.add(
                    "hidden"
                );

            }

        });


        if (destination) {

            resultMessage.textContent =
                `${visible} stays found for "${destination}"`;

            resultMessage.classList.remove(
                "hidden"
            );

        } else {

            resultMessage.classList.add(
                "hidden"
            );

        }


        document
            .getElementById("stays")
            .scrollIntoView({
                behavior: "smooth"
            });

    }
);


// =====================================================
// DESTINATION QUICK SEARCH
// =====================================================

document
    .querySelectorAll(".destination-card")
    .forEach(card => {

        card.addEventListener(
            "click",
            () => {

                destinationInput.value =
                    card.dataset.destination;

                searchBtn.click();

            }
        );

    });


// =====================================================
// FILTERS
// =====================================================

filterButtons.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            const filter =
                button.dataset.filter;


            filterButtons.forEach(btn => {

                btn.classList.remove(
                    "bg-[#1c3325]",
                    "text-white"
                );

                btn.classList.add(
                    "border",
                    "border-slate-300"
                );

            });


            button.classList.remove(
                "border",
                "border-slate-300"
            );

            button.classList.add(
                "bg-[#1c3325]",
                "text-white"
            );


            propertyCards.forEach(card => {

                const type =
                    card.dataset.type;


                if (
                    filter === "all" ||
                    type === filter
                ) {

                    card.classList.remove(
                        "hidden"
                    );

                } else {

                    card.classList.add(
                        "hidden"
                    );

                }

            });

        }
    );

});


// =====================================================
// FAVORITES
// =====================================================

let favorites =
    JSON.parse(
        localStorage.getItem(
            favoriteStorageKey
        )
    ) || [];


function updateFavoriteUI() {

    favoriteButtons.forEach(button => {

        const id =
            button.dataset.id;


        if (favorites.includes(id)) {

            button.textContent = "♥";

            button.classList.add(
                "text-rose-500"
            );

        } else {

            button.textContent = "♡";

            button.classList.remove(
                "text-rose-500"
            );

        }

    });


    if (favorites.length) {

        favoriteCount.textContent =
            favorites.length;

        favoriteCount.classList.remove(
            "hidden"
        );

        favoriteCount.classList.add(
            "flex"
        );

    } else {

        favoriteCount.classList.add(
            "hidden"
        );

    }


    localStorage.setItem(
        favoriteStorageKey,
        JSON.stringify(favorites)
    );

}


favoriteButtons.forEach(button => {

    button.addEventListener(
        "click",
        event => {

            event.stopPropagation();

            const id =
                button.dataset.id;


            if (favorites.includes(id)) {

                favorites =
                    favorites.filter(
                        item => item !== id
                    );

                showToast(
                    "Removed from favorites"
                );

            } else {

                favorites.push(id);

                showToast(
                    "Added to favorites ♥"
                );

            }


            updateFavoriteUI();

        }
    );

});


updateFavoriteUI();


// =====================================================
// PROPERTY MODAL
// =====================================================

const propertyModal =
    document.getElementById(
        "propertyModal"
    );

const closePropertyModal =
    document.getElementById(
        "closePropertyModal"
    );

const modalTitle =
    document.getElementById(
        "modalTitle"
    );

const modalLocation =
    document.getElementById(
        "modalLocation"
    );

const modalRating =
    document.getElementById(
        "modalRating"
    );

const modalImage =
    document.getElementById(
        "modalImage"
    );

const modalPrice =
    document.getElementById(
        "modalPrice"
    );

const nightCount =
    document.getElementById(
        "nightCount"
    );

const roomTotal =
    document.getElementById(
        "roomTotal"
    );

const serviceFee =
    document.getElementById(
        "serviceFee"
    );

const grandTotal =
    document.getElementById(
        "grandTotal"
    );

const reserveBtn =
    document.getElementById(
        "reserveBtn"
    );


let currentProperty = {
    name: "",
    price: 0
};


// Image mapping

const propertyImages = {

    "Villa Aria":
        "https://images.unsplash.com/photo-1601918774946-25832a4be0d6?auto=format&fit=crop&w=1400&q=85",

    "Casa Mare":
        "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=1400&q=85",

    "Nordic Cabin":
        "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?auto=format&fit=crop&w=1400&q=85",

    "Aegean House":
        "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1400&q=85",

    "Mori House":
        "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1400&q=85",

    "Casa Verde":
        "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1400&q=85"

};


document
    .querySelectorAll(".book-btn")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const name =
                    button.dataset.property;

                const price =
                    Number(button.dataset.price);


                currentProperty = {
                    name,
                    price
                };


                const card =
                    button.closest(
                        ".property-card"
                    );


                const location =
                    card.querySelector(
                        "p.mt-1"
                    )?.textContent || "";


                const rating =
                    card.querySelector(
                        ".text-sm.font-bold"
                    )?.textContent || "★ 4.8";


                modalTitle.textContent =
                    name;

                modalLocation.textContent =
                    location;

                modalRating.textContent =
                    rating;

                modalPrice.textContent =
                    `$${price}`;

                modalImage.src =
                    propertyImages[name];

                modalImage.alt =
                    name;


                calculatePrice();


                propertyModal.classList.remove(
                    "hidden"
                );

                propertyModal.classList.add(
                    "flex"
                );

                document.body.classList.add(
                    "overflow-hidden"
                );

            }
        );

    });


// =====================================================
// CLOSE MODAL
// =====================================================

function closeModal() {

    propertyModal.classList.add(
        "hidden"
    );

    propertyModal.classList.remove(
        "flex"
    );

    document.body.classList.remove(
        "overflow-hidden"
    );

}


closePropertyModal.addEventListener(
    "click",
    closeModal
);


propertyModal.addEventListener(
    "click",
    event => {

        if (
            event.target === propertyModal
        ) {

            closeModal();

        }

    }
);


document.addEventListener(
    "keydown",
    event => {

        if (event.key === "Escape") {

            closeModal();

        }

    }
);


// =====================================================
// PRICE CALCULATOR
// =====================================================

function calculateNights(
    start,
    end
) {

    if (!start || !end) {
        return 1;
    }


    const startDate =
        new Date(start);

    const endDate =
        new Date(end);


    const difference =
        endDate - startDate;


    const nights =
        Math.ceil(
            difference /
            (1000 * 60 * 60 * 24)
        );


    return nights > 0
        ? nights
        : 1;

}


function calculatePrice() {

    const nights =
        calculateNights(
            modalCheckIn.value,
            modalCheckOut.value
        );


    const room =
        currentProperty.price *
        nights;


    const fee =
        Math.round(room * 0.08);


    const total =
        room + fee;


    nightCount.textContent =
        nights;

    roomTotal.textContent =
        `$${room}`;

    serviceFee.textContent =
        `$${fee}`;

    grandTotal.textContent =
        `$${total}`;

}


// =====================================================
// RESERVE
// =====================================================

reserveBtn.addEventListener(
    "click",
    () => {

        if (
            !modalCheckIn.value ||
            !modalCheckOut.value
        ) {

            showToast(
                "Please select your dates."
            );

            return;

        }


        if (
            modalCheckOut.value <=
            modalCheckIn.value
        ) {

            showToast(
                "Check-out must be after check-in."
            );

            return;

        }


        localStorage.setItem(
            "vayo-last-booking",
            JSON.stringify({
                property:
                    currentProperty.name,

                checkIn:
                    modalCheckIn.value,

                checkOut:
                    modalCheckOut.value,

                guests,

                total:
                    grandTotal.textContent
            })
        );


        closeModal();


        showToast(
            "Reservation request created ✓"
        );

    }
);


// =====================================================
// NEWSLETTER
// =====================================================

const newsletterForm =
    document.getElementById(
        "newsletterForm"
    );


newsletterForm.addEventListener(
    "submit",
    event => {

        event.preventDefault();


        const email =
            document.getElementById(
                "emailInput"
            ).value.trim();


        if (!email) {
            return;
        }


        localStorage.setItem(
            "vayo-newsletter",
            email
        );


        newsletterForm.reset();


        showToast(
            "You're on the list ✓"
        );

    }
);


// =====================================================
// TOAST
// =====================================================

const toast =
    document.getElementById(
        "toast"
    );


let toastTimer;


function showToast(message) {

    toast.textContent =
        message;


    toast.classList.remove(
        "translate-y-20",
        "opacity-0"
    );


    toast.classList.add(
        "translate-y-0",
        "opacity-100"
    );


    clearTimeout(
        toastTimer
    );


    toastTimer =
        setTimeout(
            () => {

                toast.classList.remove(
                    "translate-y-0",
                    "opacity-100"
                );

                toast.classList.add(
                    "translate-y-20",
                    "opacity-0"
                );

            },
            2500
        );

}


// =====================================================
// KEYBOARD SHORTCUT
// =====================================================

document.addEventListener(
    "keydown",
    event => {

        // "/" → focus destination

        if (
            event.key === "/" &&
            document.activeElement.tagName !== "INPUT"
        ) {

            event.preventDefault();

            destinationInput.focus();

        }

    }
);