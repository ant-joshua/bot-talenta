require('dotenv').config();
const puppeteer = require("puppeteer");

// add stealth plugin and use defaults (all evasion techniques)
// const StealthPlugin = require("puppeteer-extra-plugin-stealth");
// puppeteer.use(StealthPlugin());

(async () => {
        try {
            const browser = await puppeteer
                .launch({
                    headless: false,
                    defaultViewport: null,
                    args: ["--start-fullscreen"],
                });
            const page = await browser.newPage();

            const navigationPromise = page.waitForNavigation({
                waitUntil: "networkidle2",
            });

            await page.goto("https://hr.talenta.co/site/sign-in", {
                waitUntil: "networkidle2",
            });

            await page.waitForSelector(".tl-site-layout #loginform-email");
            await page.click(".tl-site-layout #loginform-email");

            await page.type(
                ".tl-site-layout #loginform-email",
                process.env.USERNAME
            );

            await page.type(
                ".tl-site-layout #loginform-password",
                process.env.PASSWORD
            );

            await page.waitForSelector(
                ".tl-site-layout > .tl-site-content > #login-form > .form-group > .btn"
            );
            await page.click(
                ".tl-site-layout > .tl-site-content > #login-form > .form-group > .btn"
            );

            await page.waitForSelector(
                ".tl-card > .mt-5 > .tl-dashboard-request > .btn-group > .btn"
            );
            await page.click(
                ".tl-card > .mt-5 > .tl-dashboard-request > .btn-group > .btn"
            );

            await page.waitForSelector(
                ".mt-5 > .tl-dashboard-request > .btn-group > .dropdown-menu > .dropdown-item:nth-child(1)"
            );
            await page.click(
                ".mt-5 > .tl-dashboard-request > .btn-group > .dropdown-menu > .dropdown-item:nth-child(1)"
            );

            await navigationPromise;

            await page.waitForTimeout(5000);

            await page.waitForSelector("#changeShiftRequestBtn", {
                visible: true,
            });

            const selectRequestAttendance = await page.waitForSelector(
                "#changeShiftRequestBtn",
                {
                    visible: true,
                }
            );

            await selectRequestAttendance.click();
            console.log("click request attendance button");

            // Waiting for Request Attendance to open
            await page.waitForSelector("#modalRequestChangeShift", {
                visible: true,
            });
            console.log("modal Request Change Shift");

            await page.waitForTimeout(2000);
            const typeRequestCheckin = await page.waitForSelector(
                "#typeRequestCheckin"
            );
            await typeRequestCheckin.click();
            console.log("Request Check In");

            const selectEffectiveDate = await page.waitForSelector(
                "#datepicker_request"
            );
            // await selectEffectiveDate.type("21 January, 2021");
            await selectEffectiveDate.click();

            // await page.waitForSelector("attendanceRequest")
            // console.log("select effective date");

            // await page.waitForSelector("#datepicker_request");

            // await page.
            const attendanceDate = process.env.ATTENDANCE_DATE
            
            await page.waitForSelector(`[aria-label="${attendanceDate}"]`);
            const selectDate = await page.$$(`[aria-label="${attendanceDate}"]`);
            // data-pick="1611162000000"
            await selectDate[1].click();
            console.log("selectDate success");

            await page.waitForSelector(".picker__footer");
            await page.waitForTimeout(2000);

            const selectDateButton = await page.waitForSelector(
                // "#datepicker_request_root > div > div > div > div > div.picker__footer > button.btn-flat.picker__close",
                "button[class='btn-flat picker__close'][aria-controls='datepicker_request']",
                { visible: true }
            );
            const testing = await page.evaluate(() => {
                const getPicker = document.querySelectorAll(
                    "#datepicker_request_root > div > div > div > div > div.picker__footer > button.btn-flat.picker__close"
                );
                return getPicker[0].click();
            });

            console.dir(testing);
            // console.log(await selectDateButton.$(''));
            await selectDateButton.click();
            await page.keyboard.press("Enter");

            const checkInAttendance = await page.waitForSelector(
                "#checkInAttendance"
            );
            await checkInAttendance.type(process.env.CHECKIN);
            console.log("Check In Attendance");

            const checkOutAttendance = await page.waitForSelector(
                "#checkOutAttendance"
            );
            await checkOutAttendance.type(process.env.CHECKOUT);
            console.log("Check Out Attendance");
            
            const notes = await page.waitForSelector("#changeshiftrequest-reason");
            await notes.type("work from home");
            if(process.env.IS_SUBMIT == true){
                const btnSubmitAttendance = await page.waitForSelector("#btnSaveRequest");
                await btnSubmitAttendance.click();
                console.log("Button Submit Clicked");
            }else{
                const btnCancelAttendance = await page.waitForSelector(".custom-cancel-btn");
                await btnCancelAttendance.click();
                console.log("Button Cancel Clicked")
            }
        } catch (error) {
            console.error({ error }, "error");
            await browser.close();
        }
})();
