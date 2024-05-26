# RSYNC_RSH='ssh -p 60022' 
rsync --progress \
    -r /Users/pw/dev/schronisko-out/ ubuntu@146.59.32.93:~/www-data-stuff/img
