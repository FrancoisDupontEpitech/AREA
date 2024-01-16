from django.db import models
# Create your models here.
from django.db import models

class Services_list(models.Model):

    name = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    image_path = models.CharField(max_length=255)

    def __str__(self):
        return self.name

class Actions_list(models.Model):

    name = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    image_path = models.CharField(max_length=255)
    service = models.ForeignKey('authentication.Services_list', on_delete=models.CASCADE, related_name='actions_list')

    def __str__(self):
        return self.name


class Reactions_list(models.Model):

    name = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    image_path = models.CharField(max_length=255)
    service = models.ForeignKey('authentication.Services_list', on_delete=models.CASCADE, related_name='reactions_list')

    def __str__(self):
        return self.name

class Users(models.Model):

    username = models.CharField(max_length=50)
    email = models.CharField(max_length=255)
    password = models.CharField(max_length=50, null=True, blank=True)
    token = models.CharField(max_length=255)
    googleauth_id = models.CharField(max_length=255, null=True, blank=True)
    Twitch_token = models.CharField(max_length=255, null=True, blank=True)
    Spotify_token = models.CharField(max_length=255, null=True, blank=True)
    Github_token = models.CharField(max_length=255, null=True, blank=True)

    ## must include a userid 

    def __str__(self):
        return self.username

class AREA_table(models.Model):

    userID = models.ForeignKey('authentication.Users', on_delete=models.CASCADE, related_name='AREA', null=True, blank=True)
    ##AREA_name = models.CharField(max_length=255)
    isActivated = models.BooleanField(False) ## activation status of the AREA

# les différents noms que peuvent prendre les services dans "ActionService" et "ReactionService"
##  Discord  ##  Github  ##  Google  ##  OpenWeather  ## Spotify ##  Timer  ##  Twitch
    ActionService = models.CharField(max_length=25) 
    ReactionService = models.CharField(max_length=25)

# les différents noms que peuvent prendre les services dans "ActionService" et "ReactionService"
    ## action DISCORD
    ## reaction DISCORD -> DiscordSendMessage : envoyer un message sur un channel.

    ## action GITHUB -> + GithubNewRepoCommit : nouveau commit sur un repo, renvoie true
    ##               -> + GithubNewBranch : une branche à été créer, renvoie true
    ##               -> + GithubNewRepoMember : une personne à été ajoutéer sur le repo, renvoie true
    ## reaction GITHUB -> GithubGetOrganisationdList : recevoir liste des organisations affiliées à l'utilisateur (quelle action la trigger??? ask nathan)     //
    ##                 -> GithubGetRepoCommitList : recevoir liste des commits sur un repo
    ##                 -> + GithubDeleteMemberOfRepo : supprime une personne sur un repo
    ##                 -> GithubGetRepoMembersList : recevoir liste des personnes sur un repo.
    ##                 -> + GithubAddMemberToRepo : ajoute une personne sur un repo.

    ## action GOOGLE -> GoogleReceiveEmailFrom : Si nouvel email (envoyé par une personne spécifique) reçu , renvoyer true.
    ## reaction GOOGLE -> GoogleAddToTrash : mettre le mail spécifié dans trash.
    ##                 -> GoogleAddToFavorites : mettre le mail spécifié dans Favorits.
    ##                 -> GoogleSendEmailTo : envoyer un mail à une pesonne spécifique.

    ## action SPOTIFY -> SpotifyFollowingNewArtist : si l'utilisateur suit un nouvel artiste, renvoyer true.
    ##                -> + SpotifyCreatedNewPlaylist : si l'utilisateur à créé une nouvelle playlist, renvoyer true.
    ##                -> SpotifyAddedSongPlaylist : si utilisateur à ajouté un son à sa playlist, renvoyer true.
    ## reaction SPOTIFY -> SpotifyAddSongToPlaylist : l'utilisateur ajoute un son à une playlist
    ##                 -> + SpotifyCreatePlaylist : l'utilisateur créer une playlist.

    ## action TIMER -> TimerEveryXSec : toutes les X secondes, return true.
    ##              -> TimerAtTime :  à telle heure, return true

    ## action TWITCH -> + TwitchStreamerIsLive : si streamer précis est en live, renvoie true.
    ##               -> + TwitchNewFollower : si l'utilisateur a un nouveau folllower, renvoie true
    ##               -> TwitchNewVideoPublished : si l'utilisateur publie une nouvelle vidéo, renvoie true
    ## reaction TWITCH -> TwitchGetBlockedUsersList : récuperer la liste des personnes que l'utilisateur a bloqué.
    ##                 -> + TwitchBlockUser : l'utilisateur veut bloquer quelqu'un.
    ##                 -> + TwitchUnblockUser : l'utilisateur veut débloquer quelqu'un.
    ##                 -> TwitchFollowNewChanel : utilisateur follow une chaine.
    ##                 -> TwitchUnfollowChanel : utilisateur unfollow une chaine.

    ## action OPENWEATHER -> OpenWeatherGetTemp : si la température est depassée, renvoyer true
    ##                    -> OpenWeatherGetHumidity : si l'humidité est depassée, renvoyer true
    ##                    -> OpenWeatherGetQuality : si la température est depassée, renvoyer true

    ## reaction OPENWEATHER -> OpenWeatherGetTemp : si il est une heure spécifique, transmettre au user la température.

    ActionMethod = models.CharField(max_length=100) 
    ReactionMethod = models.CharField(max_length=100)

## vars de l'action ou réaction du service choisi

    ## DISCORD
    DiscordSendMessage_Body = models.TextField(blank=True)

    ## OPENWEATHER 
    ## variables set par l'utilisateur (si elles ne portent que le nom du service, elles marchent pour n'import laquelle des actions our réaction d'Openweather)
    OpenWeather_City = models.CharField(max_length=200, null=True, blank=True) #
    OpenWeather_Temp = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)
    OpenWeather_Humidity = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)#
    OpenWeather_airQuality = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)#

    ## GITHUB
    Github_RepositoryNameForAction = models.CharField(max_length=200, null=True, blank=True) #
    Github_OrganisationNameForAction = models.CharField(max_length=200, null=True, blank=True) #

    Github_RepositoryNameForReaction = models.CharField(max_length=200, null=True, blank=True) #
    Github_OrganisationNameForReaction = models.CharField(max_length=200, null=True, blank=True) #

    GithubAddMemberToRepo_Member = models.CharField(max_length=200, null=True, blank=True) # var spécifique à cette fonction
    GithubAddMemberToRepo_Role = models.CharField(max_length=200, null=True, blank=True) # var spécifique à cette fonction

    ## GOOGLE
    ## variable "SenderEmail" set part l'utilisateur dans l'action "GoogleReceiveEmailFrom" et utilisées par "GoogleReceiveEmailFrom", "GoogleAddToTrash", "GoogleAddToFavorites"
    Google_SenderEmail = models.CharField(max_length=255, null=True, blank=True)

    GoogleSendEmailTo_myEmail = models.CharField(max_length=255, null=True, blank=True)
    GoogleSendEmailTo_ReceiverEmail = models.CharField(max_length=255, null=True, blank=True)
    GoogleSendEmailTo_EmailBody = models.TextField(blank=True)
    GoogleSendEmailTo_EmailObject = models.TextField(blank=True)

    ##SPOTIFY
    Spotify_PlaylistName = models.CharField(max_length=50, null=True, blank=True) #nom playlist
    Spotify_SongUrl = models.CharField(max_length=255, null=True, blank=True) #url du son à ajouter à la playlist
    SpotifyCreatePlaylist_PlaylistName = models.CharField(max_length=255, null=True, blank=True) #nom de la playlist à créer
    ## TIMER
    TimerEveryXSec_Interval = models.DecimalField(max_digits=4, decimal_places=2, null=True, blank=True) ## interval spécifié par l'utilisateur
    TimerAtTime_Time = models.CharField(max_length=100, null=True, blank=True) ## Heure spécifiée par l'utilisateur

    ## TWITCH
    TwitchStreamerIsLive_StreamerName = models.CharField(max_length=100, null=True, blank=True)#
    Twitch_UserPseudo = models.CharField(max_length=100, null=True, blank=True) #Pseudo à bloqur/débloquer
    Twitch_ChanelName = models.CharField(max_length=100, null=True, blank=True) #Nom de la chaine à follow/unfollow

    def __str__(self):
        return self.name
