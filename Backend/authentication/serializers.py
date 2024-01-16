from rest_framework.serializers import ModelSerializer

from authentication.models import Services_list, Actions_list, Reactions_list, Users, AREA_table

class Actions_listSerializer(ModelSerializer):
 
    class Meta:
        model = Actions_list
        fields = ['id', 'name', 'description', 'image_path']

class Reactions_listSerializer(ModelSerializer):
 
    class Meta:
        model = Reactions_list
        fields = ['id', 'name', 'description', 'image_path']

class Services_listSerializer(ModelSerializer):
    actions_list = Actions_listSerializer(many=True)
    reactions_list = Reactions_listSerializer(many=True)

    class Meta:
        model = Services_list
        fields = ['id', 'name', 'description', 'image_path', 'actions_list', 'reactions_list']

class UsersSerializer(ModelSerializer):
 
    class Meta:
        model = Users
        fields = ['id', 'username', 'email', 'password', 'token', 'googleauth_id']

class AREA_tableSerializer(ModelSerializer):
    userID = UsersSerializer
    class Meta:
        model = AREA_table
        fields = ['id','userID','isActivated',
                'ActionService', 'ReactionService','ActionMethod', 'ReactionMethod',

                'Github_RepositoryNameForAction', 'Github_OrganisationNameForAction',
                'Github_RepositoryNameForReaction','Github_OrganisationNameForReaction',
                'GithubAddMemberToRepo_Member', 'GithubAddMemberToRepo_Role',

                'Google_SenderEmail', 'GoogleSendEmailTo_myEmail', 'GoogleSendEmailTo_ReceiverEmail',
                'GoogleSendEmailTo_EmailBody','GoogleSendEmailTo_EmailObject',
                
                'OpenWeather_City', 'OpenWeather_Temp', 'OpenWeather_Humidity', 'OpenWeather_airQuality',
                
                'Spotify_PlaylistName', 'Spotify_SongUrl', 'SpotifyCreatePlaylist_PlaylistName',
                
                'TwitchStreamerIsLive_StreamerName', 'Twitch_UserPseudo', 'Twitch_ChanelName',
                
                'TimerEveryXSec_Interval', 'TimerAtTime_Time']


class My_AREA_tableSerializer(ModelSerializer):
    userID = UsersSerializer

    class Meta:
        model = AREA_table
        fields = ['id', 'userID','isActivated',
                'ActionService', 'ReactionService','ActionMethod', 'ReactionMethod',

                'Github_RepositoryNameForAction', 'Github_OrganisationNameForAction',
                'Github_RepositoryNameForReaction','Github_OrganisationNameForReaction',
                'GithubAddMemberToRepo_Member', 'GithubAddMemberToRepo_Role',

                'Google_SenderEmail', 'GoogleSendEmailTo_myEmail', 'GoogleSendEmailTo_ReceiverEmail',
                'GoogleSendEmailTo_EmailBody','GoogleSendEmailTo_EmailObject',
                
                'OpenWeather_City', 'OpenWeather_Temp', 'OpenWeather_Humidity', 'OpenWeather_airQuality',
                
                'Spotify_PlaylistName', 'Spotify_SongUrl', 'SpotifyCreatePlaylist_PlaylistName',
                
                'TwitchStreamerIsLive_StreamerName', 'Twitch_UserPseudo', 'Twitch_ChanelName',
                
                'TimerEveryXSec_Interval', 'TimerAtTime_Time']