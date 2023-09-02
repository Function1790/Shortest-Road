def getWaitSeconds():
    pass


coil = [0, 0, 0, 0, 0, 0]
lastPlusCoil = 0
lastMinusCoil = 0
PLUS = 1
MINUS = -1

tick = 0
waitTime = getWaitSeconds()  # 전류의 방향을 바꿀때까지 기다려야할 시간


def main():
    if tick >= waitTime:
        coil[lastPlusCoil].setMode(MINUS)  # (+)인 코일중 마지막 코일을 (-)극으로 전환
        coil[lastMinusCoil].setMode(PLUS)  # (-)인 코일중 마지막 코일을 (+)극으로 전환
        waitTime = getWaitSeconds()  # 기다려야할 시간 업데이트
        tick = 0
    tick += 1
    main()


wire = {"R": 0, "S": 0, "T": 0}


modeIndex = 0
modes = [
    [+1, -1, -1],
    [+1, +1, -1],
    [-1, +1, -1],
    [-1, +1, +1]
]


def main():
    if tick >= waitTime:
        wire["R"].setCurrent(modes[modeIndex][0])
        wire["S"].setCurrent(modes[modeIndex][1])
        wire["T"].setCurrent(modes[modeIndex][2])

        modeIndex += 1 # 다음 모드로 넘기기
        if modeIndex >= len(modes): # 다음 모드가 배열의 크기 밖이라면
            modeIndex = 0  # 다시 0으로 설정

        waitTime = getWaitSeconds()  # 기다려야할 시간 업데이트
        tick = 0

    tick += 1
    main()
