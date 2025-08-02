document.addEventListener("DOMContentLoaded", function () {
    const search = document.getElementById("submit");
    const userinput = document.getElementById("username");
    const stats = document.querySelector(".stats")
    const easy = document.getElementById("easy");
    const medium = document.getElementById("medium");
    const hard = document.getElementById("hard");
    const cards = document.querySelector(".cards");


    search.addEventListener("click", function () {
        const userid = userinput.value;
        function isvalidusername(userid) {
            const regex = /^[a-zA-Z][a-zA-Z0-9_-]{2,15}$/;
            const valid = regex.test(userid);
            if (valid != true) {
                alert("Enter valid username");
                userinput.value = "";
                userinput.placeholder = "Enter a valid username";
            }
            else { return valid }
        }
        isvalidusername(userid);

        let url = `https://leetcode-stats-api.herokuapp.com/${userid}`

        if (userinput.value != "") {
            search.textContent = "Searching..."
            search.disabled = true

            let exe = async () => {
                let response = await fetch(url);
                let data = await response.json()

                if (data.message === "retrieved") {
                    try {
                        search.textContent = "Search"
                        search.disabled = false
                        let easypercentage = (data.easySolved / data.totalSolved) * 100;
                        let mediumpercentage = (data.mediumSolved / data.totalSolved) * 100;
                        let hardpercentage = (data.hardSolved / data.totalSolved) * 100;
                        stats.hidden = false;


                        easy.style.setProperty('background', `conic-gradient(rgb(1, 199, 1) ${easypercentage}%, #283a2e ${easypercentage}%)`);
                        medium.style.setProperty('background', `conic-gradient(rgba(197, 200, 0, 1) ${mediumpercentage}%, #5a5f41ff ${mediumpercentage}%)`);
                        hard.style.setProperty('background', `conic-gradient(rgba(255, 9, 9, 1) ${hardpercentage}%, #3a2828ff ${hardpercentage}%)`);
                        easy.innerHTML = `<div>${data.easySolved}/${data.totalSolved} </div><div>Easy</div>`
                        medium.innerHTML = `<div>${data.mediumSolved}/${data.totalSolved} </div><div>Medium</div>`
                        hard.innerHTML = `<div>${data.hardSolved}/${data.totalSolved} </div><div>Hard</div>`

                        cards.innerHTML = `
                <div>Acceptance Rate : ${data.acceptanceRate}%</div>
                <div>Rank : ${data.ranking}</div>
                <div>Attempt Efficiency : ${data.totalSolved}/${data.totalQuestions}</div>
                <div>Contribution Points : ${data.contributionPoints}</div>
                <div>Reputation : ${data.reputation}</div>
                `
                    }
                    catch {
                        search.textContent = "Search"
                        search.disabled = false
                        console.log("some error occured")
                    }
                }
                else {
                    alert(data.message);
                    search.textContent = "Search"
                    search.disabled = false;
                    userinput.value = ""
                }

            }
            exe()
        }
    })
})
