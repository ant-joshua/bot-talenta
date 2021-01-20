const puppeteer = require("puppeteer-extra");

// add stealth plugin and use defaults (all evasion techniques)
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
puppeteer.use(StealthPlugin());
puppeteer
    .launch({
        headless: false,
        defaultViewport: null,
        args: ["--start-fullscreen"],
    })
    .then(async (browser) => {
        try {
            const page = await browser.newPage();

            const navigationPromise = page.waitForNavigation({
                waitUntil: "networkidle2",
            });

            await page.goto("https://hr.talenta.co/site/sign-in", {
                waitUntil: "networkidle2",
            });

            // await page.setViewport({
            //     width: 1920,
            //     height: 1080,
            // });
            // await page.setViewport();

            await page.waitForSelector(".tl-site-layout #loginform-email");
            await page.click(".tl-site-layout #loginform-email");

            await page.type(
                ".tl-site-layout #loginform-email",
                "antoniusjoshua47@gmail.com"
            );

            await page.type(
                ".tl-site-layout #loginform-password",
                "joshuakeren123"
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
            await page.waitForSelector('[aria-label="21 January, 2021"]');
            const selectDate = await page.$$('[aria-label="21 January, 2021"]');
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

            const checkInBox = await page.waitForSelector("#checkInBox");
            await checkInBox.click();

            const checkOutBox = await page.waitForSelector("#checkOutBox");
            await checkOutBox.click();

            const checkInAttendance = await page.waitForSelector(
                "#checkInAttendance"
            );
            await checkInAttendance.type("09:00");
            console.log("Check In Attendance");

            const checkOutAttendance = await page.waitForSelector(
                "#checkOutAttendance"
            );
            await checkOutAttendance.type("18:00");
            console.log("Check Out Attendance");
        } catch (error) {
            console.error({ error }, "error");
        }

        // await page.waitForSelector(
        //     "#datepicker_request_root > .picker__holder > .picker__frame > .picker__wrap > .picker__box > .picker__footer > .picker__close"
        // );
        // await page.click(
        //     "#datepicker_request_root > .picker__holder > .picker__frame > .picker__wrap > .picker__box > .picker__footer > .picker__close"
        // );

        // await selectDate.click();
        // await selectDate.tap();
        // console.log(await selectDate.getProperties());
    });
// (async () => {
//     try {

//     } catch (error) {
//         console.error({ error });
//         await browser.close();
//     }

//     //   await navigationPromise;

//     //   await browser.close();
