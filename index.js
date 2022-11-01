import fetch from 'node-fetch';

let startEraIndex = 4390;
let endEraIndex = 4391;

async function getReports() {
    for (let eraIndex = startEraIndex; eraIndex <= endEraIndex; eraIndex++) {
        //const url = `https://api-test.polkadot.subvt.io:18900/report/era/${eraIndex}/validator/active`;
        const url = `https://api-test.kusama.subvt.io:17900/report/era/${eraIndex}/validator/active`;
        let settings = { method: "GET" };
        const response = await fetch(url, settings);
        const eraReport = await response.json();
        if (!response.ok) {
            // console.log(`Report not available for era #${eraIndex}.`);
            continue;
        }
        eraReport.validators
            .sort((a, b) => {
                if (a.reward_points < b.reward_points) {
                    return 1;
                }
                if (a.reward_points > b.reward_points) {
                    return -1;
                }
                return 0;
            })
            .forEach(function(eraValidator) {
                console.log(`${eraIndex},${eraValidator.address},${eraValidator.reward_points}`);
            });
    }
}

await getReports();