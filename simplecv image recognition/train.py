import time
from SimpleCV import (
    random,
    Color,
    KNNClassifier,
    NaiveBayesClassifier,
    TreeClassifier,
    SVMClassifier,
    HueHistogramFeatureExtractor,
    EdgeHistogramFeatureExtractor,
    HaarLikeFeatureExtractor,
    BOFFeatureExtractor,
    Image,
    ImageSet,
    Camera,
    DrawingLayer
)


class Trainer():

    def __init__(self,classes, trainPaths):
        self.classes = classes
        self.trainPaths = trainPaths


    def getExtractors(self):

        haar = HaarLikeFeatureExtractor(fname='../SimpleCV/SimpleCV/Features/haar.txt')
        return [haar]

    def getClassifiers(self,extractors):
        svm = SVMClassifier(extractors)
        tree = TreeClassifier(extractors)
        bayes = NaiveBayesClassifier(extractors)
        knn = KNNClassifier(extractors)
        return [svm,tree,bayes,knn]

    def train(self):

        self.classifiers = self.getClassifiers(self.getExtractors())
        for classifier in self.classifiers:
            classifier.train(self.trainPaths,self.classes,verbose=False)

    def test(self,testPaths):
        for classifier in self.classifiers:
            print classifier.test(testPaths,self.classes,verbose=False)

    def visualizeResults(self,classifier,imgs):
        for img in imgs:
            className = classifier.classify(img)
            img.drawText(className,10,10,fontsize=60,color=Color.BLUE)         
        imgs.show()


classes = ['pear','orange','banana','nothing']

cam = Camera()

def main():
    trainPaths = ['./'+c+'/train/' for c in classes ]
    testPaths =  ['./'+c+'/test/'   for c in classes ]

    trainer = Trainer(classes,trainPaths)
    trainer.train()
    tree = trainer.classifiers[1]
    # # imgs = ImageSet()
    # # for p in testPaths:
    # #     imgs += ImageSet(p)
    # # random.shuffle(imgs)
    # # trainer.visualizeResults(tree,imgs)
    initimg = cam.getImage()
    initimg.save("./initimg.jpg")
    while True:

        img = cam.getImage()
        diff = img - initimg
        black_stuff = diff.smooth(algorithm_name='gaussian').binarize()
        img = img+black_stuff
        className = tree.classify(img)
        img.drawText(className,10,10,fontsize=60,color=Color.BLUE)          
        # # img.save("./nothing/train/"+str(count)+".jpg")
        img.show()
        # print(className)
main()
