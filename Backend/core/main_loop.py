import sqlite3
import threading
import time
import requests
from datetime import datetime

##########################################TIMER############################################################
def timer_every_x_sec(chrono):

    # Fais une pause toute les {chrono} seconde
    print("Timer toute les {chrono}")
    time.sleep(chrono)


def timer_at_time(str):

    # Fais une pause jusqu a une certaine date heure {str}
    print("Timer at time {str}")
    date_heure = datetime.strptime(str, "%Y-%m-%d %H:%M:%S")
    now = datetime.now()

    while now < date_heure:
        time.sleep(1)
        now = datetime.now()
    print(date_heure)

#############################################################################################################

####################################OPENWEATHER##############################################################

openweather_api_key = "edc58f32b479e1b30ea8c23d9a9ca999"

# fonction pour get la temperature dans une ville
def get_weather_data(openweather_api_key):
    base_url = "https://api.openweathermap.org/data/2.5/weather?"
    params = {
        "q": "Paris,fr",
        "units": "metric",
        "appid": openweather_api_key
    }
    response = requests.get(base_url, params=params)
    data = response.json()
    return data

def temp_treashold(treashold):
    weather_data = get_weather_data(openweather_api_key)
    temperature = weather_data['main']['temp']

    print('avant la boucle')
    print(f'treashold = {treashold}, temperatur api = {temperature}')
    while temperature < treashold:
        print("dans la fonction temperature")
        time.sleep(1)
        weather_data = get_weather_data(openweather_api_key)
        temperature = weather_data['main']['temp']
        print(f'treashold = {treashold}, temperatur api = {temperature}')

def humidity(db_variable):
    weather_data = get_weather_data(openweather_api_key)
    humidity = weather_data['main']['humidity']

    while humidity < db_variable:
        print('dans la fonction humidity')
        time.sleep(1)
        weather_data = get_weather_data(openweather_api_key)
        humidity = weather_data['main']['humidity']
        print(f'variable db = {db_variable}, humidity api = {humidity}')
#######################################################################################

class GithubAc:
    def NewCommit(self, repo, org, headers):
        url = f'https://api.github.com/repos/{org}/{repo}/commits'
        response = requests.get(url, headers=headers)
        dataToCompare = response.json()[0]['sha']
        while True:
            time.sleep(20)
            res = requests.get(url, headers=headers)
            actualData = res.json()[0]['sha']
            message = res.json()
            if (actualData != dataToCompare):
                print('new commit:')
                print(message[0].get('commit', {}).get('message'))
                dataToCompare = actualData
                return (True)

    def NewBranchCreated(self, repo, org, headers):
        url = f'https://api.github.com/repos/{org}/{repo}/branches'
        response = requests.get(url, headers=headers)
        initial_branch_names = set(branch['name'] for branch in response.json())
        while True:
            time.sleep(20)
            res = requests.get(url, headers=headers)
            new_branch_names = set(branch['name'] for branch in res.json())
            new_branches = new_branch_names - initial_branch_names
            if new_branches:
                print('New branches created:')
                for new_branch in new_branches:
                    print(new_branch)
                initial_branch_names = new_branch_names
                return (True)

    def NewPersonAddedOnRepo(self, repo, org, headers):
        url = f'https://api.github.com/repos/{org}/{repo}/collaborators'
        response = requests.get(url, headers=headers)
        initial_collaborators_names = set(login['login'] for login in response.json())
        while True:
            time.sleep(20)
            res = requests.get(url, headers=headers)
            new_collaborators_names = set(login['login'] for login in res.json())
            new_collaborator = new_collaborators_names - initial_collaborators_names
            if new_collaborator:
                print('new collaborator added:')
                for new_branch in new_collaborator:
                    print(new_branch)
                initial_collaborators_names = new_collaborators_names
                return (True)

class SpotifyAc:
    def NewPlaylistCreated(self, header):
        url = 'https://api.spotify.com/v1/me/playlists'
        response = requests.get(url, headers=header)
        length = response.json()['total']
        print(response)
        while True:
            time.sleep(5)
            res = requests.get(url, headers=header)
            print(res)
            total = res.json()['total']
            if (length < total):
                print('Playlist has been created')
                response = res
                length = total
                return (True)

class TwitchAc:
    def Checklive(self, channel):
        while True:
            contents = requests.get('https://www.twitch.tv/' + channel).content.decode('utf-8')
            if 'isLiveBroadcast' in contents: 
                print(channel + ' is live')
                return (True)
            else:
                print(channel + ' is not live')
            time.sleep(20)

    def NewFollower(self, header, userid):
        url = 'https://api.twitch.tv/helix/channels/followers'
        params = {
            'broadcaster_id': userid
        }
        response = requests.get(url, headers=header, params=params)
        print(response)
        print(response.json())

class GithubReac:
    def getListOrganizations(self, headers):
        url = 'https://api.github.com/user/orgs'
        response = requests.get(url, headers=headers)
        for i in range(0, len(response.json())):
            print(response.json()[i]['login'])

    def getListCommit(self, org, repo, headers):
        url = f'https://api.github.com/repos/{org}/{repo}/commits'
        response = requests.get(url, headers=headers)
        for i in range(0, len(response.json())):
            print(response.json()[i]['commit']['author']['date'])
            print(response.json()[i]['commit']['message'])
            print(response.json()[i]['commit']['author']['name'])

    def getListCollaborators(self, org, repo, headers):
        url = f'https://api.github.com/repos/{org}/{repo}/collaborators'
        response = requests.get(url, headers=headers)
        for i in range(0, len(response.json())):
            print(response.json()[i]['login'])
            print(response.json()[i]['role_name'])

    def deleteACollaborator(self, org, repo, headers, user, perms):
        url = f'https://api.github.com/repos/{org}/{repo}/collaborators/{user}'
        params = {
            'permission': perms
        }
        response = requests.delete(url, headers=headers, params=params)
        print(response)

    def addACollaborator(self, org, repo, headers, user):
        url = f'https://api.github.com/repos/{org}/{repo}/collaborators/{user}'
        response = requests.put(url, headers=headers)
        print(response.json())

class TwitchReac:
    def BlockUser(self, header, user):
        useridurl = f"https://api.twitch.tv/helix/users?login={user}"
        res = requests.get(useridurl, headers=header)
        userid = res.json()['data'][0]['id']
        url = 'https://api.twitch.tv/helix/users/blocks'
        params = {
            'target_user_id': userid
        }
        response = requests.put(url, headers=header, params=params)
        print(response)

    def UnBlockUser(self, header, user):
        useridurl = f"https://api.twitch.tv/helix/users?login={user}"
        res = requests.get(useridurl, headers=header)
        userid = res.json()['data'][0]['id']
        url = 'https://api.twitch.tv/helix/users/blocks'
        params = {
            'target_user_id': userid
        }
        response = requests.delete(url, headers=header, params=params)
        print(response)

class SpotifyReac:
    def createPlaylist(self, header, name):
        useridurl = 'https://api.spotify.com/v1/me'
        response = requests.get(useridurl, headers=header)
        print(response)
        print(response.json())
        user_id = response.json()['id']
        url = f'https://api.spotify.com/v1/users/{user_id}/playlists'
        params = {
            'name': name,
            'public': True,
            'description': 'Playlist Created By AREA'
        }
        res = requests.post(url, headers=header, json=params)
        print(res)

def google_action(ligne):

    print('Method Action Google')
    if ligne[4] == 'GoogleReceiveEmailFrom':
        print('google receive email from')

def weather_action(ligne):

    print('Method Action OpenWeather')
    if ligne[4] == 'OpenWeatherGetTemp':
        print('open weather get temp')
        temp_treashold(ligne[8])

    if ligne[4] == 'OpenWeatherGetHumidity':
        print('open weather get humidity')
        humidity(ligne[9])

    if ligne[4] == 'OpenWeatherGetQuality':
        print('open weather get quality')

def timer_action(ligne):

    print('Method Action Weather')
    if ligne[4] == 'TimerEveryXSec':
        print('Timer Every Sec')
        timer_every_x_sec(ligne[25])
    
    if ligne[4] == 'TimerAtTime':
        print('Timer at time')
        timer_at_time(ligne[26])

def google_reaction(ligne):

    print('Method Reaction Google')
    if ligne[5] == 'GoogleAddToTrash':
        print('google add to trash')

    if ligne[5] == 'GoogleAddToFavorites':
        print('google add to favorites')
    
    if ligne[5] == 'GoogleSendEmailTo':
        print('google send email to')

def discord_reaction(ligne):

    print('Method Reaction discord')
    if ligne[5] == 'DiscordSendMessage':
        print('Discord send message')

def github_action(ligne, users):
    GitAction = GithubAc()
    BearerToken = 'Bearer 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'
    # BearerToken = ''
    # id = ligne[30]
    # for user in users:
    #     if id == user[0]:
    #         BearerToken = user[8]
    repo = ligne[11]
    org = ligne[12]
    header = {
        'Accept': 'application/vnd.github+json',
        'Authorization': BearerToken,
        'X-GitHub-Api-Version': '2022-11-28'
    }
    if (org == ''):
        url = 'https://api.github.com/user'
        response = requests.get(url, headers=header)
        org = response.json()['name']
    print('Method Action Github')
    if ligne[4] == 'GithubNewRepoCommit':
        GitAction.NewCommit(repo, org, header)

    if ligne[4] == 'GithubNewBranch':
        GitAction.NewBranchCreated(repo, org, header)

    if ligne[4] == 'GithubNewRepoMember':
        GitAction.NewPersonAddedOnRepo(repo, org, header)

def spotify_action(ligne, users):
    SpotAction = SpotifyAc()
    BearerToken = ''
    id = ligne[30]
    for user in users:
        if id == user[0]:
            BearerToken = user[7]
    header = {
        'Authorization': BearerToken
    }
    print('Method Action Spotify')
    if ligne[4] == 'SpotifyCreatedNewPlaylist':
        SpotAction.NewPlaylistCreated(header)


def twitch_action(ligne, users):
    TwitchAction = TwitchAc()
    BearerToken = ''
    id = ligne[30]
    for user in users:
        if id == user[0]:
            BearerToken = user[6]
    user = ligne[27]
    header = {
        'Client-Id': 'bthrygm14dnmz04ggw23vh63dmfxa8',
        'Authorization': BearerToken
    }
    url = 'https://api.twitch.tv/helix/users'
    response = requests.get(url, headers=header)
    userid = response.json()['id']
    print('Method Action Twitch')
    if ligne[4] == 'TwitchStreamerIsLive':
        TwitchAction.Checklive(user)

    if ligne[4] == 'TwitchNewFollower':
        TwitchAction.NewFollower(header, userid)

def twitch_reaction(ligne, users):
    TwitchReaction = TwitchReac()
    BearerToken = ''
    id = ligne[30]
    for user in users:
        if id == user[0]:
            BearerToken = user[6]
    user = ligne[28]
    header = {
        'Client-Id': 'bthrygm14dnmz04ggw23vh63dmfxa8',
        'Authorization': BearerToken
    }
    print('Method Reaction Twitch')
    if ligne[5] == 'TwitchBlockUser':
        TwitchReaction.BlockUser(header, user)
    
    if ligne[5] == 'TwitchUnblockUser':
        TwitchReaction.UnBlockUser(header, user)
        
def spotify_reaction(ligne, users):
    SpotifyReaction = SpotifyReac()
    name = ligne[24]
    BearerToken = ''
    id = ligne[30]
    for user in users:
        if id == user[0]:
            BearerToken = user[7]
    header = {
        'Authorization': BearerToken
    }
    print('Method reaction Spotify')
    if ligne[5] == 'SpotifyCreatePlaylist':
        SpotifyReaction.createPlaylist(header, name)


def github_reaction(ligne, users):
    GitReaction = GithubReac()
    BearerToken = 'Bearer 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'
    # BearerToken = ''
    # id = ligne[30]
    # for user in users:
    #     if id == user[0]:
    #         BearerToken = user[8]
    repo = ligne[13]
    org = ligne[14]
    user = ligne[15]
    perms = ligne[16]
    header = {
        'Accept': 'application/vnd.github+json',
        'Authorization': BearerToken,
        'X-GitHub-Api-Version': '2022-11-28'
    }
    print('Method Reaction')
    if ligne[5] == 'GithubDeleteMemberOfRepo':
        GitReaction.deleteACollaborator(org, repo, header, user, perms)

    if ligne[5] == 'GithubAddMemberToRepo':
        GitReaction.addACollaborator(org, repo, header, user, perms)

def create_area(ligne, users):
    # Action
    # Appel de fonction qui concerne les actions des services qui sont lier
    # while ligne[1] == 1:
        print(f'thread = {ligne[0]} le thread est actif')
        print('Action :')

        if ligne[2] == 'Github':
            print('github')
            github_action(ligne, users)

        if ligne[2] == 'Google':
            print('google')
            google_action(ligne)

        if ligne[2] == 'OpenWeather':
            print('openweather')
            weather_action(ligne)

        if ligne[2] == 'Spotify':
            print('Spotify')
            spotify_action(ligne, users)

        if ligne[2] == 'Timer':
            print('Timer')
            timer_action(ligne)

        if ligne[2] == 'Twitch':
            print('Twitch')
            twitch_action(ligne, users)

        # Reaction
        # Appel des fonctions qui sont lier aux services
        print('Reaction :')
        if ligne[3] == 'Discord':
            print('discord')
            discord_reaction(ligne)

        if ligne[3] == 'Github':
            print('github')
            github_reaction(ligne, users)
    
        if ligne[3] == 'Google':
            print('google')
            google_reaction(ligne)

        if ligne[3] == 'Spotify':
            print('Spotify')
            spotify_reaction(ligne, users)

        if ligne[3] == 'Twitch':
            print('Twitch')
            twitch_reaction(ligne, users)


def data_base_and_create_area_thread():
    list_id_area = [0]
    list_thread_area = []

    while True:
        sqliteConnection = sqlite3.connect('../../Backend/db.sqlite3')
        cursor = sqliteConnection.cursor()
        cur = sqliteConnection.cursor()
        print("Get data from SQLite")
    
        cursor.execute("SELECT * FROM authentication_area_table")
        cur.execute("SELECT * FROM authentication_users")
    
        record = cursor.fetchall()
        users = cur.fetchall()
    
        for ligne in record:
            if ligne[0] not in list_id_area:
                print("Thread cree")
                thread = threading.Thread(target = create_area, args=(ligne, users))
                thread.start()
                list_thread_area.append(thread)

        for ligne in record:
            if ligne[0] not in list_id_area:
                list_id_area.append(ligne[0])
        
        for i in list_thread_area:
            i.join()
        time.sleep(1)

if __name__ == "__main__":
    data_base_and_create_area_thread()