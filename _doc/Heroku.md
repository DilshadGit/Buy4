1 Lpgin and create new apps ebuyme
	https://dashboard.heroku.com/new-app
	Appname: ebuyme
	Country: Europe
	press button >> Create app
	next >> Open app
2. Download Heroku CLI to Mac
	brew tap heroku/brew && brew install heroku
	after installation you have to login run :
	heroku login

	Example:
	dilshadabdulla@Dilshads-MacBook-Pro buyme % heroku login
	heroku: Press any key to open up the browser to login or q to exit: 
	Opening browser to https://cli-auth.heroku.com/auth/cli/browser/8d49d920-37b4-4a8e-9ee1-a9fd1fbafc5e?requestor=SFMyNTY.g2gDbQAAAA4xNDguMjUyLjEyOC4zNG4GAFC3PHN-AWIAAVGA.bUgyqVrydkyTKTSh63PTFw_phsbaIubSQRkd6dye0R4
	Logging in... done
	Logged in as dilshad.a73@gmail.com

3. 	heroku git:remote -a ebuyme 

	dilshadabdulla@Dilshads-MacBook-Pro buyme % heroku git:remote -a ebuyme
	set git remote heroku to https://git.heroku.com/ebuyme.git

	git remote -v
	dilshadabdulla@Dilshads-MacBook-Pro buyme % git remote -v              
	heroku	https://git.heroku.com/ebuyme.git (fetch)
	heroku	https://git.heroku.com/ebuyme.git (push)
	origin	git@bitbucket.org:DilMac/buymepro.git (fetch)
	origin	git@bitbucket.org:DilMac/buymepro.git (push)

	To create new app in heroku you can use the terminal like:
	heroku create barbarapps
	dilshadabdulla@Dilshads-MacBook-Pro buyme % heroku create barbaraapps
	Creating ⬢ barbaraapps... done
	https://barbaraapps.herokuapp.com/ | https://git.heroku.com/barbaraapps.git

4.  pip install gunicorn whitenoise

	@Dilshads-MacBook-Pro buyme % pip install gunicorn whitenoise
	Requirement already satisfied: gunicorn in /Users/dilshadabdulla/PROJECT_HOME/buymenvs/lib/python3.9/site-packages (20.0.4)
	Collecting whitenoise
	  Using cached whitenoise-5.3.0-py2.py3-none-any.whl (19 kB)
	Requirement already satisfied: setuptools>=3.0 in /Users/dilshadabdulla/PROJECT_HOME/buymenvs/lib/python3.9/site-packages (from gunicorn) (58.3.0)
	Installing collected packages: whitenoise
	Successfully installed whitenoise-5.3.0
	(buymenvs) dilshadabdulla@Dilshads-MacBook-Pro buyme % pip freeze > requirments.txt 

5.	create new file runtime.txt adding the version of python in the project file where requirements.txt file located
	python-3.9.9

	Next create another file called Procfile without any extentions
	touch Procfile add following data to this file:
	web: gunicorn configs.wsgi --log-file -

6.	Add the link for the heroku project to settings.py ALLOWED_HOSTS where domain name is.
	ALLOWED_HOSTS = ['*', 'ebuyme.herokuapp.com', '127.0.0.1']


7.	Next go to setting in current project in Heroku web:
	https://dashboard.heroku.com/apps/ebuyme/settings

	Click Add buildpack and select the language which is python

8. Go to Deploy in the heroku page add the repository and select gihub, next search the name of 		repository in heroku :
	https://dashboard.heroku.com/apps/ebuyme/deploy/heroku-git

	search for ebuyme https://dashboard.heroku.com/apps/ebuyme/deploy/github when the repo name dsiplay connect








