document.addEventListener('DOMContentLoaded', () => {
    
    // --- Global: Header Navigation Logic (Bug #2 Fix) ---
    const profileBtn = document.getElementById('profileBtn');
    const profileDropdown = document.getElementById('profileDropdown');
    const menuBtn = document.getElementById('menuBtn');
    const mobileDrawer = document.getElementById('mobileDrawer');
    const drawerOverlay = document.getElementById('drawerOverlay');
    const closeMenuBtn = document.getElementById('closeMenuBtn');

    if(profileBtn) {
        profileBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            profileDropdown.classList.toggle('hidden');
        });
    }

    if(menuBtn) {
        menuBtn.addEventListener('click', () => {
            mobileDrawer.classList.remove('hidden');
            drawerOverlay.classList.remove('hidden');
        });
    }

    const closeDrawer = () => {
        if(mobileDrawer) mobileDrawer.classList.add('hidden');
        if(drawerOverlay) drawerOverlay.classList.add('hidden');
    };

    if(closeMenuBtn) closeMenuBtn.addEventListener('click', closeDrawer);
    if(drawerOverlay) drawerOverlay.addEventListener('click', closeDrawer);

    // Close dropdowns when clicking outside
    document.addEventListener('click', (e) => {
        if(profileDropdown && !profileBtn.contains(e.target) && !profileDropdown.contains(e.target)) {
            profileDropdown.classList.add('hidden');
        }
        const travellersDropdown = document.getElementById('travellersDropdown');
        const travellersBtn = document.getElementById('travellersBtn');
        if(travellersDropdown && travellersBtn && !travellersBtn.contains(e.target)) {
            travellersDropdown.classList.add('hidden');
        }
    });

    // --- Homepage: Search Logic (Bug #3 Fix) ---
    const travellersBtn = document.getElementById('travellersBtn');
    const travellersDropdown = document.getElementById('travellersDropdown');
    const letsGoBtn = document.getElementById('letsGoBtn');

    if(travellersBtn) {
        travellersBtn.addEventListener('click', () => {
            travellersDropdown.classList.toggle('hidden');
        });

        // Prevent clicking inside dropdown from closing it
        travellersDropdown.addEventListener('click', (e) => e.stopPropagation());

        let adults = 1;
        let children = 0;
        
        const updateDisplay = () => {
            document.getElementById('adultCount').innerText = adults;
            document.getElementById('childCount').innerText = children;
            document.querySelector('.traveller-display').innerText = `${adults} Adult${adults>1?'s':''}, ${children} Child${children!==1?'ren':''}`;
        };

        document.getElementById('incAdult').addEventListener('click', () => { adults++; updateDisplay(); });
        document.getElementById('decAdult').addEventListener('click', () => { if(adults > 1) adults--; updateDisplay(); });
        document.getElementById('incChild').addEventListener('click', () => { children++; updateDisplay(); });
        document.getElementById('decChild').addEventListener('click', () => { if(children > 0) children--; updateDisplay(); });

        letsGoBtn.addEventListener('click', () => {
            const dest = document.querySelector('input[placeholder="e.g. Goa, Rishikesh"]').value || "Anywhere";
            alert(`Searching for hostels in ${dest} for ${adults} Adults and ${children} Children.\n(Routing implemented here)`);
        });
    }


    // --- Property Page: Booking State Logic (Bug #1 Fix) ---
    // Cart state
    let cart = {};

    const selectBtns = document.querySelectorAll('.select-room-btn');
    const emptySummary = document.getElementById('emptySummary');
    const activeSummary = document.getElementById('activeSummary');
    const selectedRoomsList = document.getElementById('selectedRoomsList');
    const totalPriceEl = document.getElementById('totalPrice');
    const toast = document.getElementById('toast');

    const showToast = (msg) => {
        toast.innerText = msg;
        toast.classList.remove('hidden');
        setTimeout(() => toast.classList.add('hidden'), 3000);
    };

    const updateSummary = () => {
        const keys = Object.keys(cart);
        if(keys.length === 0) {
            emptySummary.classList.remove('hidden');
            activeSummary.classList.add('hidden');
            return;
        }

        emptySummary.classList.add('hidden');
        activeSummary.classList.remove('hidden');
        
        selectedRoomsList.innerHTML = '';
        let total = 0;

        keys.forEach(id => {
            const item = cart[id];
            total += item.price * item.qty;
            
            const li = document.createElement('li');
            li.innerHTML = `<span>${item.qty}x ${item.name}</span> <span>₹${item.price * item.qty}</span>`;
            selectedRoomsList.appendChild(li);
            
            // Update UI Counters
            document.querySelector(`#qty-${id} .room-qty`).innerText = item.qty;
        });

        totalPriceEl.innerText = `₹${total}`;
    };

    selectBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = btn.getAttribute('data-id');
            const name = btn.getAttribute('data-name');
            const price = parseInt(btn.getAttribute('data-price'));

            // Hide select button, show quantity
            btn.classList.add('hidden');
            document.getElementById(`qty-${id}`).classList.remove('hidden');

            cart[id] = { name, price, qty: 1 };
            showToast(`${name} added!`);
            updateSummary();
        });
    });

    // Handle +/- buttons for rooms
    document.querySelectorAll('.add-room').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = btn.getAttribute('data-id');
            cart[id].qty++;
            updateSummary();
        });
    });

    document.querySelectorAll('.remove-room').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = btn.getAttribute('data-id');
            if(cart[id].qty > 1) {
                cart[id].qty--;
            } else {
                delete cart[id];
                // Show Select button again
                document.getElementById(`qty-${id}`).classList.add('hidden');
                document.querySelector(`.select-room-btn[data-id="${id}"]`).classList.remove('hidden');
            }
            updateSummary();
        });
    });

});
