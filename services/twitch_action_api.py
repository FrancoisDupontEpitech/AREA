import requests
import json
import time

class TwitchAc:
    def Checklive(self, channel):
        while True:
            contents = requests.get('https://www.twitch.tv/' + channel).content.decode('utf-8')
            if 'isLiveBroadcast' in contents: 
                print(channel + ' is live')
            else:
                print(channel + ' is not live')
            time.sleep(20)

def test(header, userid):
    url = 'https://api.twitch.tv/helix/channels/followers'
    params = {
        'broadcaster_id': userid
    }
    response = requests.get(url, headers=header, params=params)
    print(response)
    print(response.json())

if __name__ == "__main__":
    pseudo = 'Kamet0'
    tmp = TwitchAc()
    tmp.Checklive(pseudo)