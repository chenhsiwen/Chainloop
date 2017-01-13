#!/usr/bin/env python

import numpy as np
import cv2
import cv2.cv as cv
import time
child(productroute).get().val().update({"numleft": product["numleft"]})

if __name__ == '__main__':
#for image classfier 
    import sys, getopt

    cascade_fn = "./haarcascade_hand.xml"
    nested_fn  = "./haarcascade_banana.xml"

    cascade = cv2.CascadeClassifier(cascade_fn)
    nested = cv2.CascadeClassifier(nested_fn)
    time.sleep(0.1)
    carture = True
 
# capture frames from the camera

    cam = cv2.VideoCapture(0)
    while carture:
        ret, img = cam.read()
        gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        gray = cv2.equalizeHist(gray)


        rects = detect(gray, cascade)
        vis = img.copy()
        
        draw_rects(vis, rects, (0, 255, 0))
        for x1, y1, x2, y2 in rects:
            roi = gray[y1-50:y2+50, x1-50:x2+50]
            vis_roi = vis[y1-50:y2+50, x1-50:x2+50]
            
            subrects = detect(roi.copy(), nested)
            # if (len(subrects)!=0):
            #     carture = False
            draw_rects(vis_roi, subrects, (255, 0, 0))

        # draw_str(vis, (20, 20), 'time: %.1f ms' % (dt*1000))
        cv2.imshow('detect', vis)

        if 0xFF & cv2.waitKey(5) == 27:
            break
    cv2.destroyAllWindows()



