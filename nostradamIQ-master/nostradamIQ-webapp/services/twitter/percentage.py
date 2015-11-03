# TODO get number of ALL tweets for a intervall (somehow??) and calc percentage of keywork tweets

def calc_percentage(allFile, filteredFile):
        numFiltered = 0
        numAll = 0 
        with open(allFile, 'r') as allF:
                for tweet in allF:
                        numAll += 1
        allF.close()
        with open(filteredFile, 'r') as filteredF:
                for tweet in filteredF:
                        numFiltered += 1
        filteredF.close()               
        
        return float(numFIltered / numAll)
        
        
