/**
 * Complete Google Apps Script to generate forms from pasted tables
 * Supports Form Metadata + New 4-column question format
 * With Delete Functionality & PDF Export Feature
 */

// ==================== 全域變數設定 ====================
const DEBUG_MODE = true;
const DEFAULT_FOLDER_ID = '';
// ====================================================

// HTML interface for the web app
function doGet() {
  const htmlOutput = HtmlService.createHtmlOutput(getHtmlContent())
    .setTitle('Table to Google Form Generator')
    .setWidth(1000)
    .setHeight(900);

  return htmlOutput;
}

function getHtmlContent() {
  return `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Table to Google Form Generator</title>
    <style>
      * { box-sizing: border-box; }
      body {
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        max-width: 1200px;
        margin: 0 auto;
        padding: 20px;
        background-color: #f5f5f5;
      }
      .container {
        background-color: white;
        border-radius: 8px;
        padding: 30px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
      }
      h1 { color: #1a73e8; margin-top: 0; }
      .description { color: #5f6368; margin-bottom: 20px; }
      .input-section { margin-bottom: 30px; }
      label { font-weight: bold; display: block; margin-bottom: 10px; color: #202124; }
      textarea {
        width: 100%;
        min-height: 500px;
        padding: 12px;
        font-family: 'Courier New', monospace;
        font-size: 13px;
        border: 1px solid #dadce0;
        border-radius: 4px;
        resize: vertical;
      }
      textarea:focus {
        outline: none;
        border-color: #1a73e8;
        box-shadow: 0 0 0 2px rgba(26,115,232,0.2);
      }
      .example {
        background-color: #f8f9fa;
        padding: 15px;
        border-radius: 4px;
        margin: 15px 0;
        font-size: 13px;
        border-left: 4px solid #1a73e8;
        max-height: 400px;
        overflow-y: auto;
      }
      .example pre { margin: 5px 0; font-family: 'Courier New', monospace; white-space: pre-wrap; word-wrap: break-word; }
      button {
        background-color: #1a73e8;
        color: white;
        padding: 12px 24px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 16px;
        font-weight: bold;
        margin-right: 10px;
      }
      button:hover { background-color: #1557b0; }
      button:disabled { background-color: #ccc; cursor: not-allowed; }
      .clear-btn { background-color: #5f6368; }
      .clear-btn:hover { background-color: #3c4043; }
      .export-pdf-btn { background-color: #34a853; }
      .export-pdf-btn:hover { background-color: #2d8e47; }
      .result {
        margin-top: 20px;
        padding: 20px;
        background-color: #e8f0fe;
        border-radius: 4px;
        display: none;
        border-left: 4px solid #1a73e8;
      }
      .loading {
        display: none;
        text-align: center;
        padding: 20px;
        color: #1a73e8;
        font-weight: bold;
      }
      .error {
        background-color: #fce8e6;
        border-left-color: #d93025;
        color: #d93025;
      }
      .success {
        background-color: #e6f4ea;
        border-left-color: #34a853;
      }
      .form-links { margin-top: 15px; }
      .form-links a { display: block; margin: 10px 0; color: #1a73e8; word-break: break-all; }
      .question-preview {
        margin-top: 15px;
        padding: 10px;
        background-color: white;
        border-radius: 4px;
        max-height: 300px;
        overflow-y: auto;
      }
      .question-item {
        padding: 8px;
        border-bottom: 1px solid #e0e0e0;
      }
      .question-type {
        display: inline-block;
        padding: 2px 6px;
        background-color: #e8eaed;
        border-radius: 3px;
        font-size: 11px;
        margin-left: 10px;
      }
      .question-description {
        display: block;
        font-size: 11px;
        color: #5f6368;
        margin-left: 20px;
        margin-top: 4px;
      }
      .metadata-preview {
        background-color: #f1f3f4;
        padding: 12px;
        border-radius: 4px;
        margin-bottom: 15px;
      }
      .multiline-description {
        background-color: #fff3cd;
        border-left: 3px solid #ffc107;
        padding: 8px;
        margin-top: 5px;
        font-style: italic;
        white-space: pre-wrap;
      }
      .folder-info {
        background-color: #e8f0fe;
        padding: 10px;
        border-radius: 4px;
        margin-bottom: 15px;
        font-size: 13px;
        color: #1a73e8;
      }
      h3 { margin-top: 0; color: #202124; }
      .format-table {
        width: 100%;
        border-collapse: collapse;
        margin: 10px 0;
        font-size: 12px;
      }
      .format-table th, .format-table td {
        border: 1px solid #dadce0;
        padding: 8px;
        text-align: left;
      }
      .format-table th { background-color: #f1f3f4; }
      #deleteFormBtn {
        background-color: #d93025;
        margin-top: 15px;
      }
      #deleteFormBtn:hover { background-color: #c5221f; }
      .folder-input-group {
        margin-bottom: 20px;
        padding: 15px;
        background-color: #f8f9fa;
        border-radius: 4px;
        border: 1px solid #dadce0;
      }
      .folder-input-group label { margin-bottom: 5px; }
      .folder-input-group input {
        width: 100%;
        padding: 8px;
        font-family: monospace;
        border: 1px solid #dadce0;
        border-radius: 4px;
        margin-top: 5px;
      }
      .folder-input-group input:focus {
        outline: none;
        border-color: #1a73e8;
        box-shadow: 0 0 0 2px rgba(26,115,232,0.2);
      }
      .help-text {
        font-size: 11px;
        color: #5f6368;
        margin-top: 5px;
      }
      .button-group {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        margin-top: 15px;
      }
      .debug-console {
        background-color: #f1f3f4;
        border: 1px solid #dadce0;
        border-radius: 4px;
        padding: 10px;
        margin-top: 20px;
        font-family: monospace;
        font-size: 12px;
        max-height: 200px;
        overflow-y: auto;
      }
      .debug-header {
        font-weight: bold;
        margin-bottom: 8px;
        color: #1a73e8;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>Table to Google Form Generator</h1>
      <div class="description">
        <strong>Step 1 (Optional):</strong> Add form metadata<br>
        <strong>Step 2:</strong> Add questions using tab-separated 4-column format
      </div>
      
      <div class="folder-input-group">
        <label>📁 Target Folder ID:</label>
        <input type="text" id="targetFolderId" placeholder="Enter Google Drive Folder ID">
        <div class="help-text">
          Forms will be saved to this folder. Get Folder ID from the URL: https://drive.google.com/drive/folders/[FOLDER_ID]
        </div>
        <div id="folderInfo" style="margin-top: 10px; font-size: 12px;"></div>
      </div>
      
      <div class="input-section">
        <label>📊 Paste your table here:</label>
        <textarea id="tableData" placeholder="Paste your tab-separated data here..."></textarea>
        
        <div class="example">
          <strong>Example with Metadata & Questions (copy this):</strong>
          <pre>FORM NAME: Customer Feedback Survey 2024
FORM TITLE: We Value Your Feedback!
FORM DESCRIPTION START
Please take a few minutes to help us improve our services.
Your feedback is completely anonymous.
Thank you for your participation!
FORM DESCRIPTION END

What is your name?	REQUIRED	SHORT_ANSWER#	Please enter your full name
How satisfied are you?	REQUIRED	LINEAR_SCALE#1-5	Rate your satisfaction from 1-5
Which products do you use?	NON-REQUIRED	CHECKBOX#Product A,Product B,Product C	Select all that apply
Department	REQUIRED	DROPDOWN#HR,IT,Sales,Marketing	Select your department
Additional comments?	NON-REQUIRED	PARAGRAPH#	Any suggestions for improvement?</pre>
        </div>
        
        <div style="margin: 15px 0;">
          <label>
            <input type="checkbox" id="linkToAppSheet" checked />
            🔗 Link responses to AppSheet
          </label>
        </div>
        <button id="generateBtn">Generate Google Form</button>
        <button id="clearBtn">Clear</button>
        <button id="testBtn" style="background-color: #e37400;">🧪 Test Connection</button>
        <button id="simpleFormBtn" style="background-color: #34a853;">⭐ Create Simple Test Form</button>
      </div>
      
      <div class="loading" id="loading">
        Creating your Google Form... Please wait.
      </div>
      
      <div class="result" id="result"></div>
      
      <div id="debugConsole" class="debug-console">
        <div class="debug-header">📋 Debug Console</div>
        <div id="debugContent"></div>
      </div>
    </div>
    
    <script>
      let lastFormData = null;
      
      function debugLog(message, data) {
        const debugContent = document.getElementById('debugContent');
        if (debugContent) {
          const timestamp = new Date().toLocaleTimeString();
          let logEntry = '<div style="border-bottom: 1px solid #e0e0e0; padding: 4px 0;">[' + timestamp + '] ' + message;
          if (data) {
            try {
              logEntry += ': ' + JSON.stringify(data);
            } catch(e) {
              logEntry += ': ' + data;
            }
          }
          logEntry += '</div>';
          debugContent.innerHTML += logEntry;
          debugContent.scrollTop = debugContent.scrollHeight;
        }
      }
      
      document.addEventListener('DOMContentLoaded', function() {
        debugLog('Page loaded');
        
        const targetFolderInput = document.getElementById('targetFolderId');
        const folderInfoDiv = document.getElementById('folderInfo');
        const testBtn = document.getElementById('testBtn');
        const simpleFormBtn = document.getElementById('simpleFormBtn');
        const generateBtn = document.getElementById('generateBtn');
        const clearBtn = document.getElementById('clearBtn');
        const tableData = document.getElementById('tableData');
        const loading = document.getElementById('loading');
        const result = document.getElementById('result');
        const linkToAppSheet = document.getElementById('linkToAppSheet');
        
        function validateFolder() {
          const folderId = targetFolderInput.value.trim();
          if (!folderId) {
            folderInfoDiv.innerHTML = '⚠️ No folder ID provided.';
            return;
          }
          
          google.script.run.withSuccessHandler(function(folderInfo) {
            if (folderInfo && folderInfo.valid) {
              folderInfoDiv.innerHTML = '✅ <strong>Folder accessible:</strong> ' + folderInfo.name;
            } else {
              folderInfoDiv.innerHTML = '⚠️ Cannot access folder.';
            }
          }).validateFolderId(folderId);
        }
        
        targetFolderInput.addEventListener('change', validateFolder);
        validateFolder();
        
        // Test connection button
        testBtn.addEventListener('click', function() {
          debugLog('Testing server connection...');
          google.script.run
            .withSuccessHandler(function(result) {
              debugLog('Test connection successful', result);
            })
            .withFailureHandler(function(error) {
              debugLog('Test connection failed', error);
            })
            .testConnection();
        });
        
        // Simple form button - creates a form without parsing
        simpleFormBtn.addEventListener('click', function() {
          debugLog('Creating simple test form...');
          const folderId = targetFolderInput.value.trim();
          
          loading.style.display = 'block';
          result.style.display = 'none';
          simpleFormBtn.disabled = true;
          
          google.script.run
            .withSuccessHandler(function(response) {
              loading.style.display = 'none';
              simpleFormBtn.disabled = false;
              debugLog('Simple form response', response);
              
              if (response && response.success) {
                lastFormData = response;
                showSuccess(response);
              } else {
                const errorMsg = (response && response.error) ? response.error : 'Unknown error';
                showError(errorMsg);
              }
            })
            .withFailureHandler(function(error) {
              loading.style.display = 'none';
              simpleFormBtn.disabled = false;
              debugLog('Simple form error', error);
              showError('Error: ' + error.message);
            })
            .createSimpleForm(folderId);
        });
        
        generateBtn.addEventListener('click', function() {
          const data = tableData.value;
          
          if (!data.trim()) {
            showError('Please paste some table data first!');
            return;
          }
          
          const folderId = targetFolderInput.value.trim();
          
          loading.style.display = 'block';
          result.style.display = 'none';
          generateBtn.disabled = true;

          debugLog('Sending data to server', { dataLength: data.length });
          
          google.script.run
            .withSuccessHandler(function(response) {
              loading.style.display = 'none';
              generateBtn.disabled = false;
              
              debugLog('Server response', response);

              if (response && response.success) {
                lastFormData = response;
                showSuccess(response);
              } else {
                const errorMsg = (response && response.error) ? response.error : 'Unknown error occurred';
                showError(errorMsg);
              }
            })
            .withFailureHandler(function(error) {
              loading.style.display = 'none';
              generateBtn.disabled = false;
              debugLog('Server failure', error);
              showError('Error: ' + error.message);
            })
            .createFormFromTable(data, linkToAppSheet.checked, folderId);
        });
        
        clearBtn.addEventListener('click', function() {
          tableData.value = '';
          result.style.display = 'none';
          lastFormData = null;
          debugLog('Cleared');
        });
        
        async function getQRCodeBase64(dataInput) {
          try {
            const url = 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=' + dataInput;
            const response = await fetch(url);
            const blob = await response.blob();
            
            return new Promise((resolve, reject) => {
              const reader = new FileReader();
              reader.onloadend = () => resolve(reader.result);
              reader.onerror = reject;
              reader.readAsDataURL(blob);
            });
          } catch (error) {
            console.error('Failed to fetch QR code:', error);
            return null;
          }
        }

        async function showSuccess(response) {
          result.className = 'result success';
          result.style.display = 'block';
          
          let metadataHtml = '<div class="metadata-preview">' +
            '<strong>Form Details:</strong><br>' +
            'Name: ' + (response.formName || 'N/A') + '<br>' +
            'Title: ' + (response.formTitle || 'N/A') + '<br>' +
            'Questions: ' + (response.questionCount || 0) + '<br>' +
            (response.folderUrl ? 'Saved in: <a href="' + response.folderUrl + '" target="_blank">Folder</a><br>' : '') +
            '</div>';
          
          let questionsHtml = '<h3>Questions (' + (response.questionCount || 0) + '):</h3><div class="question-preview">';
          if (response.questions && response.questions.length > 0) {
            for (let i = 0; i < response.questions.length; i++) {
              const q = response.questions[i];
              questionsHtml += '<div class="question-item">✓ ' + (q.text || '') + 
                               '<span class="question-type">' + (q.type || 'Text') + '</span>' +
                               (q.required ? ' <span style="color:#d93025;">(required)</span>' : '') +
                               (q.description ? '<div class="question-description">📝 ' + q.description + '</div>' : '') +
                               '</div>';
            }
          }
          questionsHtml += '</div>';
          
          let deleteButtonHtml = '';
          let exportPdfButtonHtml = '';
          
          if (response.formId) {
            deleteButtonHtml = '<button id="deleteFormBtn">🗑️ Delete Form</button>';
            exportPdfButtonHtml = '<button id="exportPdfBtn" class="export-pdf-btn">📄 Export PDF</button>';
          }

          // Build the questions HTML for the PDF
          let questionsHtmlPdf = '';
          if (response.questions && response.questions.length > 0) {
            for (let i = 0; i < response.questions.length; i++) {
              const q = response.questions[i];
              questionsHtmlPdf += '<div style="margin-bottom: 15px; padding-bottom: 10px; border-bottom: 1px solid #eee;">';
              questionsHtmlPdf += '<strong>' + (i + 1) + '. ' + (q.text || '') + '</strong>';
              questionsHtmlPdf += '<span style="display: inline-block; margin-left: 10px; padding: 2px 6px; background-color: #e8eaed; border-radius: 3px; font-size: 11px;">' + (q.type || 'Text') + '</span>';
              if (q.required) {
                questionsHtmlPdf += ' <span style="color:#d93025; font-size: 12px;">(required)</span>';
              }
              if (q.description) {
                questionsHtmlPdf += '<div style="font-size: 12px; color: #5f6368; margin-top: 5px;">📝 ' + q.description + '</div>';
              }
              questionsHtmlPdf += '</div>';
            }
          }

          const googleDriveLink = 'https://drive.google.com/drive/folders/' + targetFolderInput.value.trim();
          const qrCodeLink = 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=' + encodeURIComponent(response.shortUrl || response.publishedUrl || '');
          const qrCodeDataURL = await getQRCodeBase64(qrCodeLink);
          const qrCodeHtml = '<img src="' + qrCodeDataURL + '" alt="' + qrCodeLink + '">';
          const exportHtml = '<!DOCTYPE html>' +
            '<html>' +
            '<head>' +
            '<meta charset="UTF-8">' +
            '<title>Form Details - ' + (response.formName || 'Form') + '</title>' +
            '<style>' +
            'body { font-family: Arial, sans-serif; margin: 40px; line-height: 1.6; }' +
            'h2 { color: #1a73e8; }' +
            'h3 { color: #202124; margin-top: 20px; }' +
            'h4 { color: #202124; margin-top: 15px; }' +
            'a { color: #1a73e8; word-break: break-all; }' +
            '.form-details { background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin: 15px 0; }' +
            '.questions-section { margin-top: 20px; background-color: gainsboro; padding: 5px 10px 5px 10px; border-radius: 15px; border: groove; }' +
            'hr { margin: 20px 0; width: 75%; align: center; }' +
            '</style>' +
            '</head>' +
            '<body>' +
            '<h2>✅ Form Created Successfully!</h2>' +
            '<hr>' +
            '<h3>Resources:</h3>' +
            '<h4>1. for Administrator:</h4>' +
            '<ul>' +
            '<li>Google Drive: <span><a href="' + googleDriveLink + '">' + googleDriveLink + '</a></span></li>' +
            '<li>Edit Link: <a href="' + (response.editUrl || '') + '" target="_blank">' + (response.editUrl || 'N/A') + '</a></li>' +
            '<li>Response Link: <a href="' + (response.editUrl ? response.editUrl + '#responses' : '') + '" target="_blank">' + (response.editUrl ? response.editUrl + '#responses' : 'N/A') + '</a></li>' +
            '</ul>' +
            '<h4>2. for Users:</h4>' +
            '<ul>' +
            '<li>Published Link: <a href="' + (response.publishedUrl || '') + '" target="_blank">' + (response.publishedUrl || 'N/A') + '</a></li>' +
            '<li>Short Link: <a href="' + (response.shortUrl || '') + '" target="_blank">' + (response.shortUrl || 'N/A') + '</a></li>' +
            '<li>QR Code: <br>' + qrCodeHtml + '</li>' +
            '</ul>' +
            '<hr>' +
            '<h3>Form Details:</h3>' +
            '<div class="questions-section">' + 
            '<h4 style="margin-block-start: auto; display: inline;">Name:</h4> <span style="display: inline;">' + (response.formName || 'N/A') + '</span>' +
            '<br/>' +
            '<h4 style="margin-block-start: auto; display: inline;">Title:</h4> <span style="display: inline;">' + (response.formTitle || response.formName || 'N/A') + '</span>' +
            '<h4 style="margin-bottom: 6px;">Questions (' + (response.questionCount || 0) + '):</h4>' + 
            questionsHtmlPdf + 
            '</div>' +
            '</body>' +
            '</html>';
          result.innerHTML = exportHtml;
          result.innerHTML += '<div style="margin-top: 20px;">' + deleteButtonHtml + exportPdfButtonHtml + '</div>';
          
          if (response.formId) {
            setTimeout(function() {
              const deleteBtn = document.getElementById('deleteFormBtn');
              if (deleteBtn) {
                deleteBtn.addEventListener('click', function() {
                  if (confirm('Delete this form?')) {
                    loading.style.display = 'block';
                    google.script.run
                      .withSuccessHandler(function(dr) {
                        loading.style.display = 'none';
                        if (dr && dr.success) {
                          result.innerHTML = '<h3>✅ Form Deleted!</h3>';
                          lastFormData = null;
                        } else {
                          showError('Delete failed');
                        }
                      })
                      .deleteForm(response.formId);
                  }
                });
              }
              
              const exportBtn = document.getElementById('exportPdfBtn');
              if (exportBtn) {
                exportBtn.addEventListener('click', function() {
                  exportFormDetailsAsPDF(exportHtml, response);
                });
                exportFormDetailsAsPDF(exportHtml, response);
              }
            }, 100);
          }
        }
        
        function showError(message) {
          result.className = 'result error';
          result.style.display = 'block';
          result.innerHTML = '<h3>Error</h3><p>' + message + '</p>';
          debugLog('Error:', message);
        }
        
        function exportFormDetailsAsPDF(exportHtml, formData) {
          if (!formData) {
            showError('No form data');
            return;
          }
          
          debugLog('Exporting PDF', exportHtml);
          
          // Build the PDF HTML content according to the requested format
          const pdfContent = exportHtml;
          loading.style.display = 'block';
          
          google.script.run
            .withSuccessHandler(function(result) {
              loading.style.display = 'none';
              debugLog('PDF result', result);
              
              if (result && result.success) {
                const binaryString = atob(result.data);
                const bytes = new Uint8Array(binaryString.length);
                for (let i = 0; i < binaryString.length; i++) {
                  bytes[i] = binaryString.charCodeAt(i);
                }
                const blob = new Blob([bytes], { type: 'application/pdf' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'GoogleFormGeneration_' + new Date().toISOString().split('.')[0].replace(/[-:]/g, '') + '.pdf';
                a.click();
                URL.revokeObjectURL(url);
                debugLog('PDF download started');
              } else {
                showError('PDF failed: ' + (result && result.error));
              }
            })
            .withFailureHandler(function(error) {
              loading.style.display = 'none';
              debugLog('PDF error', error);
              showError('PDF failed: ' + error.message);
            })
            .exportFormDetailsToPDF(pdfContent, formData.formName);
        }
      });
    </script>
  </body>
</html>
`;
}

/**
 * Test connection function
 */
function testConnection() {
  Logger.log("Test connection called");
  return {
    success: true,
    message: 'Server connected',
    timestamp: new Date().toISOString()
  };
}

/**
 * Create a simple test form (bypasses parsing)
 */
function createSimpleForm(targetFolderId) {
  try {
    Logger.log("Creating simple test form");

    if (!targetFolderId || targetFolderId.trim() === '') {
      targetFolderId = DEFAULT_FOLDER_ID;
    }

    const formName = 'Simple Test Form - ' + new Date().toLocaleString();
    const form = FormApp.create(formName);

    // Add a test question
    const item = form.addTextItem();
    item.setTitle('What is your name?')
      .setHelpText('Please enter your full name')
      .setRequired(true);

    // Add another question
    const item2 = form.addParagraphTextItem();
    item2.setTitle('Any comments?')
      .setHelpText('Please share your feedback')
      .setRequired(false);

    Utilities.sleep(1000);

    // Move to folder
    try {
      const folder = DriveApp.getFolderById(targetFolderId);
      const formFile = DriveApp.getFileById(form.getId());
      formFile.moveTo(folder);
    } catch (e) {
      Logger.log("Could not move form: " + e.toString());
    }

    form.setTitle(formName);
    form.setDescription('Created on ' + new Date().toLocaleString());
    form.setConfirmationMessage('Thank you for your response!');

    const shortUrl = form.shortenFormUrl(form.getPublishedUrl());

    Logger.log("Form created: " + form.getId());

    return {
      success: true,
      editUrl: form.getEditUrl(),
      publishedUrl: form.getPublishedUrl(),
      shortUrl: shortUrl,
      formId: form.getId(),
      formName: formName,
      formTitle: formName,
      formDescription: 'Simple test form',
      questionCount: 2,
      folderUrl: "https://drive.google.com/drive/folders/" + targetFolderId,
      questions: [
        { text: 'What is your name?', type: 'Text', required: true, description: 'Please enter your full name' },
        { text: 'Any comments?', type: 'Paragraph', required: false, description: 'Please share your feedback' }
      ]
    };

  } catch (error) {
    Logger.log("Error in createSimpleForm: " + error.toString());
    return {
      success: false,
      error: error.toString()
    };
  }
}

/**
 * Main function to parse table and create form
 */
function createFormFromTable(tableData, linkToAppSheet, targetFolderId) {
  let moveSuccess = false;
  
  // Use default folder ID if none provided
  if (!targetFolderId || targetFolderId.trim() === '') {
    targetFolderId = DEFAULT_FOLDER_ID;
  }
  
  try {
    if (DEBUG_MODE) {
      Logger.log("Starting form creation...");
      Logger.log("Target folder ID: " + targetFolderId);
    }
    
    // Parse metadata and questions
    const parsedData = parseFullFormat(tableData);
    
    if (parsedData.questions.length === 0) {
      return {
        success: false,
        error: 'No valid questions found in the table. Please check your format.'
      };
    }
    
    // Create the form with metadata
    const formName = parsedData.formName || ('Generated Form - ' + new Date().toLocaleString());
    const form = FormApp.create(formName);
    
    if (DEBUG_MODE) {
      Logger.log("Form created, ID: " + form.getId());
    }
    
    // Wait for file to be created
    Utilities.sleep(1000);
    
    // Move to target folder
    let targetFolder = null;
    try {
      targetFolder = DriveApp.getFolderById(targetFolderId);
      const formFile = DriveApp.getFileById(form.getId());
      formFile.moveTo(targetFolder);
      moveSuccess = true;
      if (DEBUG_MODE) {
        Logger.log("Form moved to target folder");
      }
    } catch (folderError) {
      Logger.log("Warning: Could not move form - " + folderError.toString());
    }

    // If linkToAppSheet is true, create Google Sheet to store responses
    if (linkToAppSheet) {
      try {
        const sheetName = formName + " - Responses";
        const sheet = SpreadsheetApp.create(sheetName);
        const sheetFile = DriveApp.getFileById(sheet.getId());
        
        if (targetFolder) {
          sheetFile.moveTo(targetFolder);
        } else {
          try {
            const fallbackFolder = DriveApp.getFolderById(targetFolderId);
            sheetFile.moveTo(fallbackFolder);
          } catch (e) {
            Logger.log("Cannot move sheet, keeping in root: " + e.toString());
          }
        }
        
        form.setDestination(FormApp.DestinationType.SPREADSHEET, sheet.getId());
        
        const sheetObj = SpreadsheetApp.openById(sheet.getId());
        const firstSheet = sheetObj.getSheets()[0];
        firstSheet.getRange("A1").setValue("📊 Form Responses");
        firstSheet.getRange("A2").setValue("Form ID: " + form.getId());
        firstSheet.getRange("A3").setValue("Created: " + new Date().toLocaleString());
        firstSheet.getRange("A1:A3").setFontWeight("bold");
        
        if (DEBUG_MODE) {
          Logger.log("Response sheet created: " + sheetName);
          Logger.log("Sheet ID: " + sheet.getId());
          Logger.log("Form destination set: " + form.getDestinationId());
        }
        
      } catch (sheetError) {
        Logger.log("Error creating response sheet: " + sheetError.toString());
      }
    }
    
    // Set form title (what respondents see)
    if (parsedData.formTitle) {
      form.setTitle(parsedData.formTitle);
    } else {
      form.setTitle(formName);
    }
    
    // Set form description
    if (parsedData.formDescription) {
      form.setDescription(parsedData.formDescription);
    } else {
      form.setDescription('This form was automatically generated on ' + new Date().toLocaleDateString());
    }
    
    // Set confirmation message
    form.setConfirmationMessage('Thank you for your response!');
    
    // Add all questions
    for (let i = 0; i < parsedData.questions.length; i++) {
      addQuestionWithDescription(form, parsedData.questions[i]);
    }
    
    if (DEBUG_MODE) {
      Logger.log("Added " + parsedData.questions.length + " questions");
    }
    
    // Get short URL
    const shortUrl = form.shortenFormUrl(form.getPublishedUrl());
    
    return {
      success: true,
      editUrl: form.getEditUrl(),
      publishedUrl: form.getPublishedUrl(),
      shortUrl: shortUrl,
      formId: form.getId(),
      formName: formName,
      formTitle: parsedData.formTitle || formName,
      formDescription: parsedData.formDescription,
      questionCount: parsedData.questions.length,
      folderUrl: moveSuccess ? "https://drive.google.com/drive/folders/" + targetFolderId : null,
      questions: parsedData.questions.map(function(q) {
        return { 
          text: q.text, 
          type: q.type,
          required: q.required,
          description: q.description
        };
      })
    };
    
  } catch (error) {
    Logger.log("Error: " + error.toString());
    return {
      success: false,
      error: error.toString()
    };
  }
}

/**
 * Delete Google Form
 * @param {string} formId - The ID of the form to delete
 * @returns {object} Delete result
 */
function deleteForm(formId) {
  try {
    const formFile = DriveApp.getFileById(formId);
    const fileName = formFile.getName();
    formFile.setTrashed(true);
    
    if (DEBUG_MODE) {
      Logger.log("Form deleted: " + fileName + " (" + formId + ")");
    }
    
    return {
      success: true,
      message: 'Form "' + fileName + '" has been deleted.'
    };
    
  } catch (error) {
    Logger.log("Error deleting form: " + error.toString());
    return {
      success: false,
      error: error.toString()
    };
  }
}

/**
 * Parse full format including metadata and questions
 */
function parseFullFormat(rawData) {
  const lines = rawData.split(/\r?\n/);
  const metadata = {
    formName: null,
    formTitle: null,
    formDescription: null
  };
  const questions = [];
  
  let i = 0;
  let inMultilineDescription = false;
  let multilineLines = [];
  
  // First pass: extract metadata
  while (i < lines.length) {
    const line = lines[i];
    const trimmedLine = line.trim();
    
    // Skip empty lines at the beginning
    if (trimmedLine === '' && !inMultilineDescription) {
      i++;
      continue;
    }
    
    // Handle multi-line description
    if (trimmedLine.match(/^FORM\s*DESCRIPTION\s*START\s*$/i)) {
      inMultilineDescription = true;
      multilineLines = [];
      i++;
      continue;
    }
    
    if (trimmedLine.match(/^FORM\s*DESCRIPTION\s*END\s*$/i)) {
      inMultilineDescription = false;
      if (multilineLines.length > 0) {
        metadata.formDescription = multilineLines.join('\n').trim();
      }
      i++;
      continue;
    }
    
    if (inMultilineDescription) {
      multilineLines.push(lines[i]);
      i++;
      continue;
    }
    
    // Check for metadata patterns
    const nameMatch = trimmedLine.match(/^FORM\s*NAME\s*[:=]\s*(.+)$/i);
    const titleMatch = trimmedLine.match(/^FORM\s*TITLE\s*[:=]\s*(.+)$/i);
    const descMatch = trimmedLine.match(/^FORM\s*DESCRIPTION\s*[:=]\s*(.+)$/i);
    
    if (nameMatch) {
      metadata.formName = nameMatch[1].trim();
      i++;
      continue;
    }
    
    if (titleMatch) {
      metadata.formTitle = titleMatch[1].trim();
      i++;
      continue;
    }
    
    if (descMatch) {
      metadata.formDescription = descMatch[1].trim();
      i++;
      continue;
    }
    
    // If not metadata, break to parse questions
    break;
  }
  
  // Second pass: parse questions from remaining lines
  for (let j = i; j < lines.length; j++) {
    const line = lines[j].trim();
    
    // Skip empty lines and comments
    if (line === '' || line.startsWith('#')) {
      continue;
    }
    
    // Skip metadata lines that might appear again
    if (line.match(/^FORM\s+(NAME|TITLE|DESCRIPTION)/i)) {
      continue;
    }
    
    // Split by tab
    const parts = line.split('\t');
    
    // Need at least 3 columns
    if (parts.length < 3) {
      Logger.log("Skipping invalid line: " + line);
      continue;
    }
    
    const questionText = parts[0].trim();
    const requiredRaw = parts[1].trim().toLowerCase();
    const typePart = parts[2].trim();
    const description = parts.length > 3 ? parts[3].trim() : '';
    
    if (questionText === '') {
      continue;
    }
    
    // Parse required
    const required = requiredRaw.toUpperCase() == "REQUIRED";
    
    // Parse type and supplement
    let typeSuppl = '';
    let questionType = typePart;
    
    if (typePart.indexOf('#') > -1) {
      const typeSplit = typePart.split('#');
      questionType = typeSplit[0].trim();
      typeSuppl = typeSplit.length > 1 ? typeSplit[1].trim() : '';
    }
    
    // Handle LINEAR_SCALE without # (e.g., just "1-5")
    if (questionType.match(/^\d+\s*-\s*\d+$/)) {
      typeSuppl = questionType;
      questionType = 'LINEAR_SCALE';
    }
    
    const normalizedType = normalizeQuestionType(questionType);
    
    questions.push({
      text: questionText,
      required: required,
      type: normalizedType,
      options: typeSuppl,
      description: description
    });
    
    if (DEBUG_MODE) {
      Logger.log("Question: " + questionText + " | Type: " + normalizedType + " | Required: " + required);
    }
  }
  
  // Set defaults
  if (!metadata.formName) {
    metadata.formName = 'Generated Form - ' + new Date().toLocaleString();
  }
  if (!metadata.formTitle) {
    metadata.formTitle = metadata.formName;
  }
  
  return {
    formName: metadata.formName,
    formTitle: metadata.formTitle,
    formDescription: metadata.formDescription,
    questions: questions
  };
}

/**
 * Normalize question type
 */
function normalizeQuestionType(type) {
  type = type.toUpperCase().trim();
  
  switch (type) {
    case 'SHORT_ANSWER':
    case 'SHORTANSWER':
    case 'TEXT':
      return 'Text';
    case 'PARAGRAPH':
    case 'LONG_ANSWER':
    case 'ESSAY':
      return 'Paragraph';
    case 'MCQ':
    case 'MULTIPLE_CHOICE':
    case 'MULTIPLECHOICE':
    case 'RADIO':
      return 'Multiple Choice';
    case 'CHECKBOX':
    case 'CHECKBOXES':
      return 'Checkbox';
    case 'DROPDOWN':
    case 'DROP_DOWN':
    case 'SELECT':
      return 'Dropdown';
    case 'LINEAR_SCALE':
    case 'LINEARSCALE':
    case 'SCALE':
    case 'RATING':
      return 'Linear Scale';
    case 'DATE':
      return 'Date';
    case 'TIME':
      return 'Time';
    default:
      return 'Text';
  }
}

/**
 * Add question to form with description
 */
function addQuestionWithDescription(form, question) {
  let item;
  
  switch (question.type) {
    case 'Multiple Choice':
      const choices = parseOptions(question.options);
      if (choices.length > 0) {
        const mcItem = form.addMultipleChoiceItem();
        mcItem.setTitle(question.text)
          .setChoices(choices.map(function(choice) {
            return mcItem.createChoice(choice);
          }))
          .setRequired(question.required);
        if (question.description) {
          mcItem.setHelpText(question.description);
        }
        item = mcItem;
      } else {
        item = form.addTextItem();
        item.setTitle(question.text).setRequired(question.required);
        if (question.description) {
          item.setHelpText(question.description);
        }
      }
      break;
      
    case 'Checkbox':
      const checkboxOptions = parseOptions(question.options);
      if (checkboxOptions.length > 0) {
        const cbItem = form.addCheckboxItem();
        cbItem.setTitle(question.text)
          .setChoices(checkboxOptions.map(function(choice) {
            return cbItem.createChoice(choice);
          }))
          .setRequired(question.required);
        if (question.description) {
          cbItem.setHelpText(question.description);
        }
        item = cbItem;
      } else {
        item = form.addTextItem();
        item.setTitle(question.text).setRequired(question.required);
        if (question.description) {
          item.setHelpText(question.description);
        }
      }
      break;
      
    case 'Dropdown':
      const dropdownOptions = parseOptions(question.options);
      if (dropdownOptions.length > 0) {
        const ddItem = form.addListItem();
        ddItem.setTitle(question.text)
          .setChoices(dropdownOptions.map(function(choice) {
            return ddItem.createChoice(choice);
          }))
          .setRequired(question.required);
        if (question.description) {
          ddItem.setHelpText(question.description);
        }
        item = ddItem;
      } else {
        item = form.addTextItem();
        item.setTitle(question.text).setRequired(question.required);
        if (question.description) {
          item.setHelpText(question.description);
        }
      }
      break;
      
    case 'Linear Scale':
      let lower = 1, upper = 5;
      const rangeMatch = question.options.match(/(\d+)\s*[-~to]+\s*(\d+)/i);
      if (rangeMatch) {
        lower = parseInt(rangeMatch[1]);
        upper = parseInt(rangeMatch[2]);
      }
      const scaleItem = form.addScaleItem();
      scaleItem.setTitle(question.text)
        .setBounds(lower, upper)
        .setRequired(question.required);
      if (question.description) {
        scaleItem.setHelpText(question.description);
      }
      item = scaleItem;
      break;
      
    case 'Paragraph':
      item = form.addParagraphTextItem();
      item.setTitle(question.text).setRequired(question.required);
      if (question.description) {
        item.setHelpText(question.description);
      }
      break;
      
    case 'Date':
      item = form.addDateItem();
      item.setTitle(question.text).setRequired(question.required);
      if (question.description) {
        item.setHelpText(question.description);
      }
      break;
      
    case 'Time':
      item = form.addTimeItem();
      item.setTitle(question.text).setRequired(question.required);
      if (question.description) {
        item.setHelpText(question.description);
      }
      break;
      
    default:
      item = form.addTextItem();
      item.setTitle(question.text).setRequired(question.required);
      if (question.description) {
        item.setHelpText(question.description);
      }
      break;
  }
  
  return item;
}

/**
 * Parse comma-separated options
 */
function parseOptions(optionsString) {
  if (!optionsString || optionsString.trim() === '') {
    return [];
  }
  
  return optionsString.split(',').map(function(opt) {
    return opt.trim();
  }).filter(function(opt) {
    return opt !== '';
  });
}

/**
 * Validate Folder ID
 */
function validateFolderId(folderId) {
  try {
    const folder = DriveApp.getFolderById(folderId);
    return {
      valid: true,
      name: folder.getName(),
      url: "https://drive.google.com/drive/folders/" + folderId
    };
  } catch(e) {
    return {
      valid: false,
      error: e.toString()
    };
  }
}

/**
 * Export form details as PDF
 */
function exportFormDetailsToPDF(htmlContent, formName) {
  try {
    Logger.log("Exporting PDF: " + formName);

    const tempFileName = 'temp_pdf_' + new Date().getTime() + '.html';
    const tempFile = DriveApp.createFile(tempFileName, htmlContent, 'text/html');
    const htmlBlob = tempFile.getBlob();
    const pdfBlob = htmlBlob.getAs('application/pdf');
    const pdfBytes = pdfBlob.getBytes();
    tempFile.setTrashed(true);

    const base64Data = Utilities.base64Encode(pdfBytes);

    Logger.log("PDF created, size: " + pdfBytes.length);

    return {
      success: true,
      data: base64Data
    };

  } catch (error) {
    Logger.log("PDF export error: " + error.toString());
    return {
      success: false,
      error: error.toString()
    };
  }
}
