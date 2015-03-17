#!/bin/sh


printf "Create App Vars for current folder:\n\n"

printf "==>App Name %s? " "[$1]"
while :
do
	read
	[[ ! -z $REPLY ]] && appname="$REPLY" || appname="$1"
	[[ ! -z $appname ]] && break || printf "\033[1A\033[16C"
done

printf "==>App Title? "
while :
do
	read
	apptitle="$REPLY"
	[[ ! -z $apptitle ]] && break || printf "\033[1A\033[14C"
done

printf "==>App Port? "
while :
do
	read
	appport="$REPLY"
	[[ ! -z $appport ]] && break || printf "\033[1A\033[13C"
done

printf "==>App Description? "
while :
do
	read
	appdescription="$REPLY"
	break
done

printf "\n==>Confirm:\nGrunt task will run with this values:\n\n"
printf "==>Appname:\t [%s]\n" "$appname"
printf "==>App Port:\t [%s]\n" "$appport"
printf "==>Title:\t [%s]\n" "$apptitle"
printf "==>Description:\t [%s]\n" "$appdescription"
printf "\nIs this correct [Yn]? "

while :
do
	read
	case "$REPLY" in
		[Yy])
			grunt -v replace:appvars --webappname="$appname" --webapptitle="$apptitle" --webappport="$appport" --webappdescription="$appdescription" &&
			printf "\n==>App vars created on project." &&
			(sed -i "s/-webappnamegrunt-/${appname}/" "Gruntfile.js" &&
			sed -i "s/-webappportgrunt-/${appport}/" "Gruntfile.js") &&
			printf "\n==>App vars created on Gruntfile."
			[[ $? -eq 0 ]] && printf "\n==>App vars created." || printf "==>Error. End."
			printf "\n\n"
			exit 0
		;;
		[Nn])
			printf "==>Task not run. End."
			printf "\n\n"
			exit 1
		;;
		*) printf "\033[1A\033[22C\033[K";;
	esac
done

#{zenity --entry --entry-text="Type" --text="Bang on the keyboard"}
