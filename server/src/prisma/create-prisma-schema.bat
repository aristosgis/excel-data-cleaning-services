@echo off
echo Creating prisma folder and schema.prisma...

set "TARGET=C:\Users\JOM\Desktop\excel-data-cleaning-services\server\src\prisma"

:: Create folder path if missing
if not exist "%TARGET%" (
    echo Folder not found. Creating...
    mkdir "%TARGET%"
)

:: Create schema.prisma with full content
(
echo // ======================================================
echo // DATABASE CONFIG
echo // ======================================================
echo.
echo datasource db {
echo   provider = "postgresql"
echo   url      = env("DATABASE_URL")
echo }
echo.
echo generator client {
echo   provider = "prisma-client-js"
echo }
echo.
echo // ======================================================
echo // USER MODEL
echo // ======================================================
echo.
echo model User {
echo   id             String          ^@id ^@default(cuid())
echo   email          String          ^@unique
echo   password       String
echo   name           String?
echo   role           Role            ^@default(USER)
echo   isVerified     Boolean         ^@default(false)
echo   createdAt      DateTime        ^@default(now())
echo   updatedAt      DateTime        ^@updatedAt
echo.
echo   monthlyUploads Int             ^@default(0)
echo   lastReset      DateTime        ^@default(now())
echo.
echo   files          ProcessedFile[]
echo   logs           SystemLog[]
echo }
echo.
echo enum Role {
echo   USER
echo   ADMIN
echo }
echo.
echo // ======================================================
echo // FILE HISTORY MODEL
echo // ======================================================
echo.
echo model ProcessedFile {
echo   id        String   ^@id ^@default(cuid())
echo   userId    String
echo   fileName  String
echo   fileUrl   String
echo   createdAt DateTime ^@default(now())
echo.
echo   user      User     ^@relation(fields: [userId], references: [id])
echo }
echo.
echo // ======================================================
echo // SYSTEM LOGS MODEL
echo // ======================================================
echo.
echo model SystemLog {
echo   id        String   ^@id ^@default(cuid())
echo   userId    String?
echo   action    String
echo   details   String?
echo   createdAt DateTime ^@default(now())
echo.
echo   user      User?    ^@relation(fields: [userId], references: [id])
echo }
echo.
echo // ======================================================
echo // MONTHLY USAGE RESET TRACKING
echo // ======================================================
echo.
echo model UsageReset {
echo   id        String   ^@id ^@default(cuid())
echo   resetDate DateTime ^@default(now())
echo }
) > "%TARGET%\schema.prisma"

echo =====================================================
echo schema.prisma created successfully at:
echo %TARGET%
echo =====================================================
pause