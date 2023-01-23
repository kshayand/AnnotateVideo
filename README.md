# AnnotateVideo
web interface for annotating video 


https://user-images.githubusercontent.com/32972936/214146531-b6e12a70-bec9-4e0c-ab78-d9f99ef93bea.mov

(stock video from https://www.istockphoto.com/video/city-commuters-walking-rear-view-dolly-shot-gm1308446775-398426591 )
1) run index.html video in browser
2) select video from file selector button
3) click and drag mouse over target to draw bounding box
  - right arrow to move to next frame
  - left arrow to move to previous frame
  - delete key to remove annotation at current frame
4) download annotations as json 
  
  TODO: 
  - option to save annotations in tf record format
  - better UI design
  - button to select frametime (currently hardcoded to 1 second between each frame)
  - integration with google drive
    - assign group members videos to annotate + dashboard to see annotation progress
