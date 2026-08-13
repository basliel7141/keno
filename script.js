/* =========================================
   KENO SCRIPT
   Compatible with the current index.html
   ========================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* -----------------------------------------
       KENO NUMBER SELECTION
       ----------------------------------------- */

    const numbers = document.getElementById("numbers");
    const selectedCount = document.getElementById("selectedCount");
    const message = document.getElementById("message");

    const selected = new Set();

    // Only run this section if the elements exist.
    // This prevents JavaScript errors on the login page.
    if (numbers && selectedCount) {

        for (let i = 1; i <= 40; i++) {

            const btn = document.createElement("button");

            btn.className = "number";
            btn.type = "button";
            btn.textContent = String(i).padStart(2, "0");

            btn.onclick = function () {

                if (selected.has(i)) {

                    selected.delete(i);
                    btn.classList.remove("active");

                } else if (selected.size < 5) {

                    selected.add(i);
                    btn.classList.add("active");

                } else {

                    showMessage("You can select only 5 numbers.");
                    return;
                }

                selectedCount.textContent = selected.size;
            };

            numbers.appendChild(btn);
        }
    }


    /* -----------------------------------------
       CLEAR BUTTON
       ----------------------------------------- */

    const clearBtn = document.getElementById("clearBtn");

    if (clearBtn) {

        clearBtn.onclick = function () {

            selected.clear();

            document
                .querySelectorAll(".number")
                .forEach(function (button) {
                    button.classList.remove("active");
                });

            if (selectedCount) {
                selectedCount.textContent = "0";
            }

            showMessage("");
        };
    }


    /* -----------------------------------------
       PLAY BUTTON
       ----------------------------------------- */

    const playBtn = document.getElementById("playBtn");

    if (playBtn) {

        playBtn.onclick = function () {

            if (selected.size !== 5) {

                showMessage(
                    "Please select exactly 5 numbers."
                );

                return;
            }

            const selectedNumbers = [...selected]
                .sort(function (a, b) {
                    return a - b;
                })
                .map(function (number) {
                    return String(number).padStart(2, "0");
                })
                .join(", ");

            showMessage(
                "Selection saved: " + selectedNumbers
            );
        };
    }


    /* -----------------------------------------
       MESSAGE
       ----------------------------------------- */

    function showMessage(text) {

        if (message) {
            message.textContent = text;
        }
    }


    /* -----------------------------------------
       COUNTDOWN
       ----------------------------------------- */

    const countdown = document.getElementById("countdown");

    if (countdown) {

        let seconds = 15 * 60;

        function updateCountdown() {

            seconds--;

            if (seconds < 0) {
                seconds = 15 * 60;
            }

            const h = String(
                Math.floor(seconds / 3600)
            ).padStart(2, "0");

            const m = String(
                Math.floor((seconds % 3600) / 60)
            ).padStart(2, "0");

            const s = String(
                seconds % 60
            ).padStart(2, "0");

            countdown.textContent =
                `${h}:${m}:${s}`;
        }

        updateCountdown();

        setInterval(updateCountdown, 1000);
    }

});
