# User Guide: Table to Google Form Generator

> This guide is for the Google Apps Script web app in `google_form_generator.gs`. It helps you create Google Forms by pasting a simple table of questions.

---

## Introduction

This tool helps you create Google Forms quickly by pasting a simple table of questions. Instead of building forms manually question by question, you can prepare your questions in a spreadsheet-like format, paste everything at once, and let the tool do the rest.

You can also:
- Add a title and description to your form
- Choose which questions are required or optional
- Save the form to a specific Google Drive folder
- Automatically link responses to a Google Sheet
- Export a PDF summary of your form details (**with embedded, scannable QR code**)
- Delete a form directly from the tool

No coding knowledge is needed.

---

## Before You Start

### Step 1: Open the Web App

The tool runs as a Google Web App. Your administrator will provide you with a link that looks something like this:

`https://script.google.com/macros/s/your-script-id/exec`

Click the link to open the tool in your browser.

### Step 2: Grant Permissions (First Time Only)

The first time you open the app, it will ask for permission to:
- Create and edit Google Forms
- Access your Google Drive
- Create Google Sheets

Click **Review Permissions**, then **Allow**. This is required for the tool to work.

### Step 3: Find Your Folder ID

The tool saves forms to a specific Google Drive folder. You need the **Folder ID**:

1. Open Google Drive and navigate to the folder where you want forms saved.
2. Look at the URL in your browser's address bar. It will look like:
   `https://drive.google.com/drive/folders/your-folder-id-here`
3. Copy the long string of letters and numbers after `folders/` — that is your **Folder ID**.

> Enter your Folder ID in the input box. You can change it at any time.

---

## Step-by-Step Instructions

### 1. Set the Target Folder

1. In the web app, locate the box labeled **📁 Target Folder ID**.
2. Paste your Folder ID into the box.
3. The tool will check if the folder exists. You will see a confirmation message: **✅ Folder accessible: [folder name]**.

If you see a warning, double-check that you copied the correct Folder ID.

---

### 2. Prepare Your Table

The tool accepts a **tab-separated** format — this is easy to create in Google Sheets or Excel.

#### Basic Question Format (4 columns)

Each question must have **4 columns**, separated by tabs:

| Column 1 | Column 2 | Column 3 | Column 4 |
|----------|----------|----------|----------|
| Question text | `REQUIRED` or `NON-REQUIRED` | Question type | Description (optional) |

#### Question Types You Can Use

| Type name | What it does |
|-----------|---------------|
| `SHORT_ANSWER` | Short text line |
| `PARAGRAPH` | Large text box |
| `MULTIPLE_CHOICE` | Single selection from options |
| `CHECKBOX` | Multiple selections from options |
| `DROPDOWN` | Dropdown menu of options |
| `LINEAR_SCALE` | Number scale (e.g., 1–5) |
| `DATE` | Date picker |
| `TIME` | Time picker |

#### Adding Options (for Multiple Choice, Checkbox, Dropdown)

After the type, add a `#` symbol followed by your options separated by commas:

```
MULTIPLE_CHOICE#Yes,No,Maybe
```

For a linear scale, use a range like:

```
LINEAR_SCALE#1-5
```

#### Adding a Description (Column 4)

The fourth column is optional. Use it to add a help text or instructions that will appear below the question.

---

### 3. (Optional) Add Form Metadata

You can add a title and description to the form itself before your questions:

```
FORM NAME: Customer Feedback 2024
FORM TITLE: Tell Us What You Think
FORM DESCRIPTION START
We value your feedback. This survey takes about 3 minutes.
Your responses are anonymous.
FORM DESCRIPTION END
```

- **FORM NAME** is the file name in Google Drive
- **FORM TITLE** is what respondents see at the top of the form
- **FORM DESCRIPTION START** and **END** let you write multiple lines of description

Place these lines **above** your questions in the same text area.

---

### 4. Generate the Form

1. After preparing your table, paste it into the large text area labeled **📊 Paste your table here**.
2. Check the box **🔗 Link responses to AppSheet** if you want responses saved to a Google Sheet (recommended).
3. Click the **Generate Google Form** button.
4. Wait a few seconds. The tool will show:
   - A success message
   - The form name and number of questions
   - A preview of all questions
   - Links to the form and response sheet
   - **An embedded QR code** (ready to scan)

---

### 5. View and Share the Form

After generation, you will see several links:

| Link | Purpose |
|------|---------|
| **Edit Link** | Opens the form editor so you can make changes |
| **Response Link** | Takes you to the response spreadsheet (if linked) |
| **Published Link** | The link you share with people to fill out the form |
| **Short Link** | A shorter, cleaner version of the published link |
| **QR Code** | A scannable code — people can point their phone camera at it to open the form |

You can copy any link by clicking it or right-clicking and selecting **Copy Link**.

---

### 6. Delete a Form

1. After generating a form, scroll down to the bottom of the success message.
2. Click the red **🗑️ Delete Form** button.
3. Confirm by clicking **OK** in the popup.
4. The form will be moved to your Google Drive Trash.

> This action cannot be undone through the tool. You can restore the form from Drive Trash within 30 days if needed.

---

### 7. Export Form Details as PDF

1. After generating a form, click the green **📄 Export PDF** button.
2. The PDF will download automatically to your computer.
3. The PDF includes:
   - Form title and name
   - All questions with types and required status
   - All links (edit, published, short URL)
   - **An embedded QR code** (scannable without an internet connection)
   - Google Drive folder location

> **💡 QR Code Note:** The QR code in the exported PDF is **embedded as an image** and does not require an internet connection to display or scan. This is different from the on-screen QR code, which loads live from the web. The PDF version is fully self-contained.

This is useful for record-keeping or sharing with team members who don't need editing access.

---

## Example Table (Copy-Paste Ready)

Copy the block below and paste it directly into the tool to test:

```
FORM NAME: Customer Feedback Survey
FORM TITLE: We Value Your Feedback!
FORM DESCRIPTION START
Please take a few minutes to help us improve.
All responses are anonymous.
Thank you!
FORM DESCRIPTION END

What is your name?	REQUIRED	SHORT_ANSWER	Please enter your full name
How satisfied are you?	REQUIRED	LINEAR_SCALE#1-5	Rate from 1 (very unsatisfied) to 5 (very satisfied)
Which products do you use?	NON-REQUIRED	CHECKBOX#Product A,Product B,Product C	Select all that apply
Department	REQUIRED	DROPDOWN#HR,IT,Sales,Marketing	Choose your department
Additional comments?	NON-REQUIRED	PARAGRAPH	Any suggestions for improvement?
```

Paste this exactly as shown — the spaces between columns are **tabs**.

---

## Tips & Best Practices

### ✅ Required vs. Non-Required

- Use `REQUIRED` (all caps) when people must answer before submitting.
- Use `NON-REQUIRED` for optional questions.

### 📝 Multi-line Descriptions

To write a longer form description, use:

```
FORM DESCRIPTION START
Your long text here.
It can span multiple lines.
FORM DESCRIPTION END
```

### 🔧 Formatting Options Correctly

For question types that need options (Multiple Choice, Checkbox, Dropdown), write them without spaces after commas:

```
CHECKBOX#Red,Green,Blue     ✓ Correct
CHECKBOX#Red, Green, Blue   ✗ Avoid spaces
```

### 📁 Keep Your Folder ID Handy

Save your Folder ID somewhere safe. You'll need it every time you use the tool.

### 💡 Test First

Before building a long form, test with 2–3 questions to make sure your formatting is correct.

---

## Troubleshooting Basics

### ❌ "No valid questions found"

**What happened:** The tool couldn't recognize your table format.

**What to try:**
- Make sure each question has at least 3 columns separated by tabs
- Check that `REQUIRED` or `NON-REQUIRED` is spelled correctly and in uppercase
- Remove any blank lines between questions

### ❌ "Cannot access folder"

**What happened:** The Folder ID is incorrect, or you don't have permission.

**What to try:**
- Double-check the Folder ID from your Drive URL
- Make sure you have at least **Viewer** access to that folder

### ❌ Options are not showing up in the form

**What happened:** The options format is incorrect.

**What to try:**
- Use a `#` after the question type, then options separated by commas
- Example: `MULTIPLE_CHOICE#Yes,No,Maybe`
- Avoid spaces after commas

### ❌ The form was created but I can't find it

**What happened:** The form may have been saved to the wrong folder.

**What to try:**
- Check the success message — it shows the folder link
- Click the folder link to open the location
- Next time, double-check your Folder ID before generating

### ❌ The QR code doesn't show in the PDF

**What happened:** This should not happen — the updated tool has fixed this issue.

**What to try:**
- Make sure you're using the latest version of `google_form_generator.gs`
- Check your internet connection (the QR code needs to be downloaded once when generating)
- Look at the **📋 Debug Console** at the bottom of the page for error messages
- Try refreshing the page and generating the form again

### 🧪 Test Connection Feature

If you encounter any issues, you can:
1. Click the **🧪 Test Connection** button to verify the tool can communicate with the server
2. Click the **⭐ Create Simple Test Form** button to bypass the parsing logic and create a basic form directly

These two methods help determine whether the problem is with your table format or with the tool itself.

---

## Technical Notes (For Administrators)

### How the QR Code Works in PDFs

Older versions of the tool used external image URLs (`https://api.qrserver.com/...`), but PDF converters cannot download external images. The updated version uses a different approach:

1. In the browser, `fetch()` downloads the QR code image
2. `FileReader().readAsDataURL()` converts the image to a Base64 data URL
3. The data URL is embedded directly into the HTML before sending to the server for PDF conversion

The resulting PDF is completely self-contained and does not require an internet connection to display the QR code.

### Debug Console

A **📋 Debug Console** at the bottom of the page logs:
- Page load status
- Server communication
- Error messages

When troubleshooting, expand the console to view detailed logs that help identify issues quickly.

### Testing Tools

| Button | Purpose |
|--------|---------|
| **🧪 Test Connection** | Verifies the Google Apps Script server is reachable |
| **⭐ Create Simple Test Form** | Creates a basic 2-question form without parsing your table |

Use these to isolate whether an issue is with the tool or with your table format.

---

## Version History

| Version | Updates |
|---------|---------|
| v2.0 | Added embedded QR code in PDF, Test Connection button, Simple Test Form button, Debug Console |
| v1.0 | Initial release: table-to-form conversion, metadata support, PDF export (external QR link) |
