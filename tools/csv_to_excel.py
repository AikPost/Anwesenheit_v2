import pandas as pd , os

def readCSV(fileName):
    try:
        return pd.read_csv(fileName, sep=None,engine="python")
    
    except Exception as e:
        print(fileName)
        print(e)



a = filter(lambda x: x[-4:] == ".csv",os.listdir())

a = {fileName: readCSV(fileName) for fileName in a}

with pd.ExcelWriter("whyMustIDoThisGates.xlsx") as writer:
    for fileName, fileDf in a.items():
        fileDf.to_excel(writer, sheet_name=fileName[:-4][0:31],index=False, header=False)