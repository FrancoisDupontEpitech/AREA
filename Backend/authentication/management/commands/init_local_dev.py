from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model

from authentication.models import Services_list, Actions_list, AREA_table, Users

UserModel = get_user_model()

SERVICES_LIST = [
    {
        'name': 'Discord',
        'description': "service Discord",
        'image_path' : '../discord.png', ## remplacer par le path vers le png
        'actions_list': [

        ],

        'reactions_list': [
            {
                'name': 'DiscordSendMessage',
                'description': "Envoyer un message sur un channel",
                'image_path' : '../discord.png',
            }
        ]
        
    },
    {
        'name': 'Github',
        'description': "service GitHub",
        'image_path' : '../github.png',
        'actions_list': [
            {
                'name': 'GithubNewRepoCommit',
                'description': "Un nouveau commit est fait sur le repository spécifié",
                'image_path' : '../github.png',
            },
            {
                'name': 'GithubNewBranch',
                'description': "Une branche à été créé",
                'image_path' : '../github.png',
            },
            {
                'name': 'GithubNewRepoMember',
                'description': "Une personne à été ajoutée sur le repository spécifié",
                'image_path' : '../github.png',
            },
        ],

        'reactions_list': [
            {
                'name': 'GithubGetOrganisationdList',
                'description': "Recevoir la liste de mes organisations",
                'image_path' : '../github.png',
            },
            {
                'name': 'GithubGetRepoCommitList',
                'description': "Recevoir la liste des commits sur le repository spécifié",
                'image_path' : '../github.png',
            },
            {
                'name': 'GithubDeleteMemberOfRepo',
                'description': "Supprimer une personne sur le repository spécifié",
                'image_path' : '../github.png',
            },
            {
                'name': 'GithubGetRepoMembersList',
                'description': "Recevoir liste des personnes sur le repository spécifié",
                'image_path' : '../github.png',
            },
            {
                'name': 'GithubAddMemberToRepo',
                'description': "Ajouter une personne sur le repository spécifié",
                'image_path' : '../github.png',
            }
        ]
    },
    {
        'name': 'Google',
        'description': "service Google",
        'image_path' : '../google.png',
        'actions_list': [
            {
                'name': 'ReceiveEmailFrom',
                'description': "Je reçoit un nouvel email de la part d'une personne spécifiée",
                'image_path' : '../google.png',
            },
        ],

        'reactions_list': [
            {
                'name': 'GoogleSendEmailTo',
                'description': "Envoyer un mail à la pesonne spécifiée",
                'image_path' : '../google.png',
            },
            {
                'name': 'GoogleAddToTrash',
                'description': "Mettre le mail spécifié dans trash",
                'image_path' : '../google.png',
            },
            {
                'name': 'GoogleAddToFavorites',
                'description': "Mettre le mail spécifié dans Favorits",
                'image_path' : '../google.png',
            },
        ],
        
    },
    {
        'name': 'OpenWeather',
        'description': "service OpenWeather",
        'image_path' : '../lol.png',
        'actions_list': [
            {
                'name': 'OpenWeatherGetTemp',
                'description': "La température spécifiée est depassée",
                'image_path' : '../weather.png',
            },
            {
                'name': 'OpenWeatherGetHumidity',
                'description': "L'humidité de l'air spécifiée est depassée",
                'image_path' : '../weather.png',
            },
            {
                'name': 'OpenWeatherGetQuality',
                'description': "L'indice de qualité de l'air spécifiée est depassée",
                'image_path' : '../weather.png',
            },
        ],

        'reactions_list': [
            {
                'name': 'OpenWeatherGetTemp',
                'description': "Recevoir la température.",
                'image_path' : '../weather.png',
            }
        ],
        
    },
    {
        'name': 'Spotify',
        'description': "service Spotify",
        'image_path' : '../spotify.png',
        'actions_list': [
            {
                'name': 'SpotifyFollowingNewArtist',
                'description': "Je suis un nouvel artiste",
                'image_path' : '../spotify.png',
            },
            {
                'name': 'SpotifyCreatedNewPlaylist',
                'description': "Je créé une nouvelle playlist",
                'image_path' : '../spotify.png',
            },
            {
                'name': 'SpotifyAddedSongPlaylist',
                'description': "J'ajoute une musique à ma playlist",
                'image_path' : '../spotify.png',
            }
        ],

        'reactions_list': [
            {
                'name': 'SpotifyAddSongToPlaylist',
                'description': "ajouter une musique à une playlist",
                'image_path' : '../spotify.png',
            },
            {
                'name': 'SpotifyCreatePlaylist',
                'description': "Créer une playlist",
                'image_path' : '../spotify.png',
            }
        ]
    },
    {
        'name': 'Timer',
        'description': "service Timer",
        'image_path' : '../timer.png',
        'actions_list': [
            {
                'name': 'TimerEveryXSec',
                'description': "Toutes les X secondes",
                'image_path' : '../timer.png',
            },
            {
                'name': 'TimerAtTime',
                'description': "A l'heure et à la date spécifiée",
                'image_path' : '../timer.png',
            }
        ],

        'reactions_list': [
            
        ]
    },
    {
        'name': 'Twitch',
        'description': "service Twitch",
        'image_path' : '../twitch.png',
        'actions_list': [
            {
                'name': 'TwitchStreamerIsLive',
                'description': "Le streamer spécifié passe en live",
                'image_path' : '../twitch.png',
            },
            {
                'name': 'TwitchNewFollower',
                'description': "J'ai un nouveau folllower",
                'image_path' : '../twitch.png',
            },
            {
                'name': 'TwitchNewVideoPublished',
                'description': "Je publie une nouvelle vidéo",
                'image_path' : '../twitch.png',
            },
        ],

        'reactions_list': [
            {
                'name': 'TwitchGetBlockedUsersList',
                'description': "récuperer la liste des personnes que j'ai bloqué",
                'image_path' : '../twitch.png',
            },
            {
                'name': 'TwitchBlockUser',
                'description': "bloquer la personne spécifiée",
                'image_path' : '../twitch.png',
            },
            {
                'name': 'TwitchUnblockUser',
                'description': "Débloquer la personne spécifiée",
                'image_path' : '../twitch.png',
            },
            {
                'name': 'TwitchFollowNewChanel',
                'description': "Follow la chaine spécifiée",
                'image_path' : '../twitch.png',
            },
            {
                'name': 'TwitchUnfollowChanel',
                'description': "Unfollow la chaine spécifiée",
                'image_path' : '../twitch.png',
            },
        ] 
    },
]

USERS = [
    {
        'username':'useraaaa',
        'email': 'email',
        'password': 'password',
        'token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXJuYW1lIiwicGFzc3dvcmQiOiJ1c2VybmFtZSJ9.lx9VCrxe6iwPB54RkObLm5af13qnwYhIPS7fk9T6g3U",
        'googleauth_id': '',
        'Twitch_token': '',
        'Spotify_token': '',
        'Github_token': '',
    },
    {
        'username':'usermdrl',
        'email': 'usermdrl.name@gmail.com',
        'password': 'passwordmdr',
        'token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXJuYW1lIiwicGFzc3dvcmQiOiJlbWFpbCJ9.J75xXWjzdxA1Cav6hQlmLOjdjATm-f2YJUvqb6Ktpe0",
        'googleauth_id': '',
        'Twitch_token': '',
        'Spotify_token': '',
        'Github_token': '',
    },
    {
        'username':'user21lolol',
        'email': 'user2lolol.name@gmail.com',
        'password': 'password2',
        'token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXJuYW1lIiwicGFzc3dvcmQiOiJlbWFpbCJ9.DNFknblV1riYo4MiJVZU-usv4wP4W35ZqZPfVYJPwtc",
        'googleauth_id': '',
        'Twitch_token': '',
        'Spotify_token': '',
        'Github_token': '',
    },
]


AREA_TABLE = [
    {
        'userID': 1,
        'isActivated': True,

        'ActionService': "OpenWeather",
        'ReactionService': "Google",

        'ActionMethod': "WeatherThreashold",
        'ReactionMethod': "GoogleSendEmailTo",
        ##GITHUB
        'Github_RepositoryNameForAction':'',
        'Github_OrganisationNameForAction':'',
        'Github_RepositoryNameForReaction':'',
        'Github_OrganisationNameForReaction':'',
        'GithubAddMemberToRepo_Member':'',
        'GithubAddMemberToRepo_Role':'',
        ##GOOGLE
        'Google_SenderEmail':'',
        'GoogleSendEmailTo_myEmail': "truc.bidule@gmail.com",
        'GoogleSendEmailTo_ReceiverEmail': "machin.bidule@gmail.com",
        'GoogleSendEmailTo_EmailBody': "il fait plus de X degrés celcius!",
        'GoogleSendEmailTo_EmailObject': "Weather update !",
        ##OPENWEATHER
        'OpenWeather_City': 'Paris',
        'OpenWeather_Temp':  11.00,
        'OpenWeather_Humidity':0,
        'OpenWeather_airQuality':0,
        ##SPOTIFY
        'Spotify_PlaylistName':'',
        'Spotify_SongUrl':'',
        'SpotifyCreatePlaylist_PlaylistName':'',
        ## TWITCH
        'TwitchStreamerIsLive_StreamerName':'',
        'Twitch_UserPseudo':'',
        'Twitch_ChanelName':'',
        ##TIMER
        'TimerEveryXSec_Interval':0,
        'TimerAtTime_Time':0,
    },
    {
        'userID': 1,
        'isActivated': False,

        'ActionService': "Github",
        'ReactionService': "Google",

        'ActionMethod': "GithubNewRepoCommit",
        'ReactionMethod': "GoogleSendEmailTo",
        ##GITHUB
        'Github_RepositoryNameForAction':'',
        'Github_OrganisationNameForAction':'',
        'Github_RepositoryNameForReaction':'',
        'Github_OrganisationNameForReaction':'',
        'GithubAddMemberToRepo_Member':'',
        'GithubAddMemberToRepo_Role':'',
        ##GOOGLE
        'Google_SenderEmail':'',
        'GoogleSendEmailTo_myEmail': "truc.bidule@gmail.com",
        'GoogleSendEmailTo_ReceiverEmail': "machin.bidule@gmail.com",
        'GoogleSendEmailTo_EmailBody': "nouveau commit!",
        'GoogleSendEmailTo_EmailObject': "Github update !",
        ##OPENWEATHER
        'OpenWeather_City': 'Paris',
        'OpenWeather_Temp':  11.00,
        'OpenWeather_Humidity':0,
        'OpenWeather_airQuality':0,
        ##SPOTIFY
        'Spotify_PlaylistName':'',
        'Spotify_SongUrl':'',
        'SpotifyCreatePlaylist_PlaylistName':'',
        ## TWITCH
        'TwitchStreamerIsLive_StreamerName':'',
        'Twitch_UserPseudo':'',
        'Twitch_ChanelName':'',
        ##TIMER
        'TimerEveryXSec_Interval': 0,
        'TimerAtTime_Time': 0,
    },
]

ADMIN_ID = 'admin-oc'
ADMIN_PASSWORD = 'password-oc'


class Command(BaseCommand):

    help = 'Initialize project for local development'

    def handle(self, *args, **options):
        self.stdout.write(self.style.MIGRATE_HEADING(self.help))

        for data_services in SERVICES_LIST:
            services_list = Services_list.objects.create(name=data_services['name'],
                                                        description=data_services['description'],
                                                        image_path=data_services['image_path']
                                                        )
            for data_action in data_services['actions_list']:
                action = services_list.actions_list.create( name=data_action['name'],
                                                            description=data_action['description'],
                                                            image_path=data_action['image_path']
                                                            )
            for data_reaction in data_services['reactions_list']:
                reaction = services_list.reactions_list.create( name=data_reaction['name'],
                                                                description=data_reaction['description'],
                                                                image_path=data_reaction['image_path']
                                                                )


        for data_users in USERS:
            users = Users.objects.create( username=data_users['username'],
                                        email=data_users['email'],
                                        password=data_users['password'],
                                        token=data_users['token'],
                                        googleauth_id=data_users['googleauth_id'],
                                        Twitch_token=data_users['Twitch_token'],
                                        Spotify_token=data_users['Spotify_token'],
                                        Github_token=data_users['Github_token'],
                                        )

        for data_area in AREA_TABLE:
            area_table = AREA_table.objects.create(
                                        userID=Users.objects.get(id=data_area['userID']),
                                        #AREA_name=data_area['AREA_name'],
                                        isActivated=data_area['isActivated'],

                                        ActionService=data_area['ActionService'],
                                        ReactionService=data_area['ReactionService'],

                                        ActionMethod=data_area['ActionMethod'],
                                        ReactionMethod=data_area['ReactionMethod'],
                                        ##GITHUB
                                        Github_RepositoryNameForAction=data_area['Github_RepositoryNameForAction'],
                                        Github_OrganisationNameForAction=data_area['Github_OrganisationNameForAction'],
                                        Github_RepositoryNameForReaction=data_area['Github_RepositoryNameForReaction'],
                                        Github_OrganisationNameForReaction=data_area['Github_OrganisationNameForReaction'],
                                        GithubAddMemberToRepo_Member=data_area['GithubAddMemberToRepo_Member'],
                                        GithubAddMemberToRepo_Role=data_area['GithubAddMemberToRepo_Role'],
                                        ##GOOGLE
                                        Google_SenderEmail=data_area['Google_SenderEmail'],
                                        GoogleSendEmailTo_myEmail=data_area['GoogleSendEmailTo_myEmail'],
                                        GoogleSendEmailTo_ReceiverEmail=data_area['GoogleSendEmailTo_ReceiverEmail'],
                                        GoogleSendEmailTo_EmailBody=data_area['GoogleSendEmailTo_EmailBody'],
                                        GoogleSendEmailTo_EmailObject=data_area['GoogleSendEmailTo_EmailObject'],
                                        ##OPENWEATHER
                                        OpenWeather_City=data_area['OpenWeather_City'],
                                        OpenWeather_Temp=data_area['OpenWeather_Temp'],
                                        OpenWeather_Humidity=data_area['OpenWeather_Humidity'],
                                        OpenWeather_airQuality=data_area['OpenWeather_airQuality'],
                                        ##SPOTIFY
                                        Spotify_PlaylistName=data_area['Spotify_PlaylistName'],
                                        Spotify_SongUrl=data_area['Spotify_SongUrl'],
                                        SpotifyCreatePlaylist_PlaylistName=data_area['SpotifyCreatePlaylist_PlaylistName'],
                                        ## TWITCH
                                        TwitchStreamerIsLive_StreamerName=data_area['TwitchStreamerIsLive_StreamerName'],
                                        Twitch_UserPseudo=data_area['Twitch_UserPseudo'],
                                        Twitch_ChanelName=data_area['Twitch_ChanelName'],
                                        ##TIMER
                                        TimerEveryXSec_Interval=data_area['TimerEveryXSec_Interval'],
                                        TimerAtTime_Time=data_area['TimerAtTime_Time'])

        UserModel.objects.create_superuser(ADMIN_ID, 'admin@oc.drf', ADMIN_PASSWORD)

        self.stdout.write(self.style.SUCCESS("All Done !"))