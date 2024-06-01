# Running the JAVA springboot back end file #

## Windows Set Up ##

1. Ensure java JDK 17 is installed (Visit link to download)
	- https://www.oracle.com/nz/java/technologies/downloads/#java17

2. Once JDK is downloaded, set environment config of JAVA_HOME to point to JDK 17 file:
	- From desktop open Windows Start Menu
	- Search Environment Variables
	- On system variables, click New
	- In the variable name field enter `JAVA_HOME`
	- In the variable value field enter the installation path of your JDK (eg: C:\Program Files\...)
	- Click OK and Apply changes

2. Download the lastest version of maven (mvn)
	- https://maven.apache.org/download.cgi
	- From the site above install `the Link Binary Zip Archive` of mvn

3. Once mvn is downloaded, set environment config of MAVEN_HOME:
	- From desktop open Windows Start Menu
	- Search Environment Variables
	- On system variables, click New
	- In the variable name field enter `MAVEN_HOME`
	- In the variable value field enter the installation path of your mvn folder (eg: C:\Program\Files\Maven\...)
	- Click OK
	- Under system variables, click on the `Path` variable and edit it
	- Click New
	- Enter `%MAVEN_HOME%\bin` in the new field
	- Click OK and Apply changes

4. Verify mvn version and installation on windows PC
	- Open command prompt
	- Type `mvn -version` (Result should output the maven version and java version being used)
	- If failure above double check system variable of JDK and MAVEN (Or perhaps command prompt needs a refresh)

5. Once Java JDK and MAVEN has been installed and set up on the system, clone the backend repository from github
	- https://github.com/uoa-compsci399-s1-2024/capstone-project-2024-s1-team-7-noot-noot
	- `git clone` ...

6. Navigate to backend code
	- `cd Backend_API - NootNoot`

7. Run the mvn build to install and set up pom.xml file
	- `mvn clean install -U`
	- Should return a build success message

8. If the build has been successful, run the local server:
	- run `mvn spring-boot:run`
	- local server should be running on port 'localhost:8080/'

## Mac Set Up ##

1. Ensure java JDK 17 is installed (Visit link to download)
	- `https://www.oracle.com/nz/java/technologies/downloads/#jdk17-mac`
	- Install macOS x64 DMG Installer
	- Follow installation screen

2. Homebrew installation (visit link for download)
	- `https://brew.sh/`

3. Open command prompt to install mvn via homebrew
   	- Enter command `brew install maven`

4. Once Java JDK and MAVEN has been installed and set up on the system, clone the backend repository from github
	- https://github.com/uoa-compsci399-s1-2024/capstone-project-2024-s1-team-7-noot-noot
	- `git clone` ...

5. Navigate to backend code
	- `cd Backend_API - NootNoot`

6. Run the mvn build to install and set up pom.xml file
	- `mvn clean install -U`
	- Should return a build success message

7. If the build has been successful, run the local server:
	- run `mvn spring-boot:run`
	- local server should be running on port 'localhost:8080/'

