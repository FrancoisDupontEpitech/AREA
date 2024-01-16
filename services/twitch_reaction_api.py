import requests
import json

class TwitchReac:
    def BlockUser(header, user):
        useridurl = "https://api.twitch.tv/helix/users?login=2Lpepito"
        res = requests.get(useridurl, headers=header)
        userid = res.json()['data'][0]['id']
        url = 'https://api.twitch.tv/helix/users/blocks'
        params = {
            'target_user_id': user
        }
        response = requests.put(url, headers=header, params=params)
        print(response)

    def UnBlockUser(header, user):
        useridurl = "https://api.twitch.tv/helix/users?login=2Lpepito"
        res = requests.get(useridurl, headers=header)
        userid = res.json()['data'][0]['id']
        url = 'https://api.twitch.tv/helix/users/blocks'
        params = {
            'target_user_id': user
        }
        response = requests.delete(url, headers=header, params=params)
        print(response)


if __name__ == "__main__":
    tmp = TwitchReac()