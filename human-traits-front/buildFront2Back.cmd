@echo off
echo Starting operations...

REM Define variables for directories and files
set "destination_source_folder=\assets"
set "source_folder=dist%destination_source_folder%"
set "folder_to_remove=..\debateia\src\main\resources\static"
set "file_to_copy=dist\index.html"
set "build_command=npm run build"

REM Remove the folder and all its contents
echo Removing folder: %folder_to_remove%
if exist "%folder_to_remove%" (
    rmdir /s /q "%folder_to_remove%"
    echo Folder removed successfully.
) else (
    echo Folder does not exist, skipping removal.
)

REM Run the command
echo Running build command: %build_command%
call %build_command%

REM Create destination directory if it doesn't exist
echo Creating destination directory: %folder_to_remove%
mkdir "%folder_to_remove%" 2>nul
if not errorlevel 1 (
    echo Created destination directory.
) else (
    echo Failed to create directory, may already exist.
)

REM Copy the folder to the destination
echo Copying folder from %source_folder% to %folder_to_remove%
if exist "%source_folder%" (
    xcopy "%source_folder%" "%folder_to_remove%%destination_source_folder%" /E /I /Y
    echo Folder copied successfully.
) else (
    echo Source folder does not exist, skipping folder copy.
)

REM Copy the file to the destination
echo Copying file %file_to_copy% to %folder_to_remove%
if exist "%file_to_copy%" (
    copy "%file_to_copy%" "%folder_to_remove%" /Y
    echo File copied successfully.
) else (
    echo File does not exist, skipping file copy.
)

echo All operations completed.