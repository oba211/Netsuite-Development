/**
 * @NApiVersion 2.1
  *@NScriptType ScheduledScript
 */
define(['N/sftp', 'N/file', 'N/runtime', 'N/compress'], (sftp, file, runtime, compress) => {
    function execute() {

        try {

            var scriptObj = runtime.getCurrentScript();

            //sftp Credentials
            const userName = '';
            const url = '';
            const myPwdGuid ='';
            const myHostKey ='';

            // Establish a connection to a remote FTP server
            let connection = sftp.createConnection({
                username: userName,
                passwordGuid: myPwdGuid,
                url: url,
                hostKey: myHostKey
            });
            log.debug("connection Establish sucessfully");


            // get file list from sftp
            let Filelist = connection.list({
                path: '/'
            });
            log.debug('File List', Filelist.length);


            if (Filelist.length > 0) {

                for (var i = 0; i < Filelist.length; i++) {

                    if (
                        (Filelist[i].name != "." || Filelist[i].name != "..") &&
                        (Filelist[i].size > 0) &&
                        (Filelist[i].name.includes('PIESData') == true || Filelist[i].name.includes('PIESImage') == true || Filelist[i].name.includes('N1') == true) &&
                        (Filelist[i].name.substring(Filelist[i].name.length - 3) == 'txt')
                    ) {
                        // Download the file from the remote server
                        let downloadedFile = connection.download({
                            directory: '/',
                            filename: Filelist[i].name
                        });

                        downloadFileFrmSFTP(Filelist[i], downloadedFile, scriptObj);

                    }
                }
            }
        } catch (e) {
            log.error("error in execute function ", e.message);
        }

    }

    function getFolderId(fileName, scriptObj) {

        try {

            var folder;

            if (fileName.includes('PIESData') == true) {
                folder = Number(scriptObj.getParameter({
                    name: 'custscript_piesdata_folder'
                }));

            }
            else if (fileName.includes('PIESImage') == true) {
                folder = Number(scriptObj.getParameter({
                    name: 'custscript_piesimage_folder'
                }));

            }
            else if (fileName.includes('N1') == true) {
                folder = Number(scriptObj.getParameter({
                    name: 'custscript_n1_part_folder'
                }));
            }

            return folder;
        } catch (e) {
            log.error("error in getFolderId function", e.message);
        }
    }

    function downloadFileFrmSFTP(CurrFileObj, downloadedFile, scriptObj) {

        try {

            var folder = getFolderId(CurrFileObj.name, scriptObj);

            var fileContent = '';
            if (CurrFileObj.size < 9900000) {
                //get all the file lines data
                downloadedFile.lines.iterator().each(function (line) {
                    fileContent += line.value + '\n';
                    return true;
                });

                var fileObj = file.create({
                    name: CurrFileObj.name.substring(0, CurrFileObj.name.indexOf('.')) + ".txt",
                    fileType: file.Type.PLAINTEXT,
                    contents: fileContent,
                    folder: folder
                });
                fileObj.save();
            }
            else {
                var count = 1;
                var fileContent = '';
                var addCurrLineInNextFile = '';
                var columnHeaderOfFile = '';

                downloadedFile.lines.iterator().each(function (line) {
                    columnHeaderOfFile += line.value + '\n';
                });

                downloadedFile.lines.iterator().each(function (line) {

                    if (fileContent.length < 9900000) {
                        if (addCurrLineInNextFile.length > 0) {
                            fileContent += columnHeaderOfFile;
                            fileContent += addCurrLineInNextFile;
                            addCurrLineInNextFile = '';
                        }
                        else {
                            fileContent += line.value + '\n';
                        }
                    } else {
                        addCurrLineInNextFile += line.value + '\n';
                        var fileObj = file.create({
                            name: CurrFileObj.name.substring(0, CurrFileObj.name.indexOf('.')) + '_' + count + ".txt",
                            fileType: file.Type.PLAINTEXT,
                            contents: fileContent,
                            folder: folder
                        });

                        fileObj.save();
                        fileContent = '';
                        count++;
                    }
                    return true;
                });

            }
        } catch (e) {
            log.error("error in downloadFileFrmSFTP function", e.message);
        }

    }

    return {
        execute: execute

    };
});
