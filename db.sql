PGDMP  9            
         }            db    16.3    16.3     �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    74880    db    DATABASE     }   CREATE DATABASE db WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_United States.1252';
    DROP DATABASE db;
                postgres    false            �            1259    74881    c_role    TABLE     ^  CREATE TABLE public.c_role (
    id character varying(36) NOT NULL,
    kode character varying(50),
    nama character varying(50),
    created_at timestamp without time zone DEFAULT now(),
    created_by character varying(36),
    updated_at timestamp without time zone,
    updated_by character varying(36),
    is_deleted boolean DEFAULT false
);
    DROP TABLE public.c_role;
       public         heap    postgres    false            �            1259    74886    c_user    TABLE     �  CREATE TABLE public.c_user (
    id character varying(36) NOT NULL,
    nama character varying(50),
    username character varying(50),
    password character varying(250),
    id_role character varying(36),
    aktif boolean DEFAULT true,
    created_at timestamp without time zone DEFAULT now(),
    created_by character varying(36),
    updated_at timestamp without time zone,
    updated_by character varying(36),
    is_deleted boolean DEFAULT false,
    id_customer character varying(36)
);
    DROP TABLE public.c_user;
       public         heap    postgres    false            �            1259    74894 
   m_customer    TABLE     �  CREATE TABLE public.m_customer (
    id character varying(36) NOT NULL,
    kode character varying(50),
    nama character varying(250),
    no_telp character varying(250),
    alamat text,
    email character varying(50),
    npwp character varying(50),
    created_at timestamp without time zone DEFAULT now(),
    created_by character varying(36),
    updated_at timestamp without time zone,
    updated_by character varying(36),
    is_deleted boolean DEFAULT false
);
    DROP TABLE public.m_customer;
       public         heap    postgres    false            �            1259    74901 	   m_employe    TABLE     b  CREATE TABLE public.m_employe (
    id character varying(36) NOT NULL,
    kode character varying(50),
    nama character varying(250),
    created_at timestamp without time zone DEFAULT now(),
    created_by character varying(36),
    updated_at timestamp without time zone,
    updated_by character varying(36),
    is_deleted boolean DEFAULT false
);
    DROP TABLE public.m_employe;
       public         heap    postgres    false            �            1259    74906    menu    TABLE     �  CREATE TABLE public.menu (
    id character varying DEFAULT 'uuid_g'::character varying NOT NULL,
    nama_menu character varying,
    link_menu character varying,
    keterangan character varying,
    class_icon character varying,
    status character varying,
    created_at timestamp without time zone DEFAULT now(),
    updated_at timestamp with time zone,
    is_permission boolean,
    is_deleted boolean DEFAULT false
);
    DROP TABLE public.menu;
       public         heap    postgres    false            �            1259    74914 	   menu_user    TABLE     �  CREATE TABLE public.menu_user (
    id character varying NOT NULL,
    id_menu character varying NOT NULL,
    posisi character varying(1),
    level integer,
    urutan integer,
    status character varying(1),
    created_at timestamp without time zone DEFAULT now(),
    updated_at timestamp without time zone,
    parent character varying,
    id_role character varying,
    is_deleted boolean DEFAULT false
);
    DROP TABLE public.menu_user;
       public         heap    postgres    false            �          0    74881    c_role 
   TABLE DATA           l   COPY public.c_role (id, kode, nama, created_at, created_by, updated_at, updated_by, is_deleted) FROM stdin;
    public          postgres    false    215   �       �          0    74886    c_user 
   TABLE DATA           �   COPY public.c_user (id, nama, username, password, id_role, aktif, created_at, created_by, updated_at, updated_by, is_deleted, id_customer) FROM stdin;
    public          postgres    false    216   �        �          0    74894 
   m_customer 
   TABLE DATA           �   COPY public.m_customer (id, kode, nama, no_telp, alamat, email, npwp, created_at, created_by, updated_at, updated_by, is_deleted) FROM stdin;
    public          postgres    false    217   )#       �          0    74901 	   m_employe 
   TABLE DATA           o   COPY public.m_employe (id, kode, nama, created_at, created_by, updated_at, updated_by, is_deleted) FROM stdin;
    public          postgres    false    218   �%       �          0    74906    menu 
   TABLE DATA           �   COPY public.menu (id, nama_menu, link_menu, keterangan, class_icon, status, created_at, updated_at, is_permission, is_deleted) FROM stdin;
    public          postgres    false    219   <&       �          0    74914 	   menu_user 
   TABLE DATA           �   COPY public.menu_user (id, id_menu, posisi, level, urutan, status, created_at, updated_at, parent, id_role, is_deleted) FROM stdin;
    public          postgres    false    220   *       <           2606    74922    c_role c_role_pk 
   CONSTRAINT     N   ALTER TABLE ONLY public.c_role
    ADD CONSTRAINT c_role_pk PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.c_role DROP CONSTRAINT c_role_pk;
       public            postgres    false    215            >           2606    74924    c_user c_user_pk 
   CONSTRAINT     N   ALTER TABLE ONLY public.c_user
    ADD CONSTRAINT c_user_pk PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.c_user DROP CONSTRAINT c_user_pk;
       public            postgres    false    216            @           2606    74926    m_customer m_customer_pk 
   CONSTRAINT     V   ALTER TABLE ONLY public.m_customer
    ADD CONSTRAINT m_customer_pk PRIMARY KEY (id);
 B   ALTER TABLE ONLY public.m_customer DROP CONSTRAINT m_customer_pk;
       public            postgres    false    217            B           2606    74928    m_employe m_employe_pk 
   CONSTRAINT     T   ALTER TABLE ONLY public.m_employe
    ADD CONSTRAINT m_employe_pk PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.m_employe DROP CONSTRAINT m_employe_pk;
       public            postgres    false    218            D           2606    74930    menu menu_pkey 
   CONSTRAINT     L   ALTER TABLE ONLY public.menu
    ADD CONSTRAINT menu_pkey PRIMARY KEY (id);
 8   ALTER TABLE ONLY public.menu DROP CONSTRAINT menu_pkey;
       public            postgres    false    219            F           2606    74932    menu_user menu_user_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.menu_user
    ADD CONSTRAINT menu_user_pkey PRIMARY KEY (id);
 B   ALTER TABLE ONLY public.menu_user DROP CONSTRAINT menu_user_pkey;
       public            postgres    false    220            G           2606    74933    c_user c_user_id_role_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.c_user
    ADD CONSTRAINT c_user_id_role_fkey FOREIGN KEY (id_role) REFERENCES public.c_role(id) ON UPDATE CASCADE;
 D   ALTER TABLE ONLY public.c_user DROP CONSTRAINT c_user_id_role_fkey;
       public          postgres    false    215    216    4668            �   �   x�m�1n�0��:�/@��HY�f���I�8[˒N���v��@.����6̹R�X� �=A�X���&�t#Rwܦe|�?/#��9�$f��5p�����;:��c���&�x�\}�ٷ�v'}�.k�N����+ ƞ\�!�Z	e8�)QB�%�����A�)���⎰a���~j�{{���<-�=�=b:T��Y�+��'����i�1�$dI�      �   �  x���KS"1��ç��5Cw�=7AXa�q�Z��Kf2aQ:0���7�*��J*�yu��7�A㐘q�P��B��6�{k|�l���v~9_}6Ϩ8C8k����k�tm�%���f��|?���������U�[
�:?��a<��%�AQTh��J�w2[�g�I )���6! ��6Q:�Z������{qhq�t����?Y1g#�6H�sm<@�/6�v�w;��g0�=�����jP.q�;7/
.����M�鶋��r�&�υ>�|eV�X0!�E[s��J�`��6B&m�2����?戴�L`�QK��ش��|aXp*�G<2g�a*_JTj�*K[�"b�'�!���DCc{��e]o���-?&';�~�[u{���~���������.�9=�պ�XMW��{w��׽/�( sDD�q�*���{ >�dR�Ҁ=�<^`6�%ҫ(3GV(K�@� �흆/���K8W�<���d~P����鰯�ݦ��y�5���zu�m������6R�uT45� �g�6ʈ����Es������Bd|`Fxɔ�QDcU]]�M=n�,��h$�ӂ���ߍ{����&��]��Y�ϫ�CI�5��.���E�����1�a��Y{���X|��R��_y�#ί��j��"�      �   �  x�m��N�0��ӧ�Ԗ��jѢ��
���'vZS�Ti"���$[�bEJ��L|�wR���<6���u&X|�N�xT�XsQl�U�C�뎬c&�>B��p���~l��q�����g"ĚP�0��
o���x��V�}
�+�B��bB*f�i����T*"t	�T�)a�*��>��p_r^*`Z�Vn�6뵖�r�	�� Q�༣��Xk�em'QE1�;��D.��o3�O�B������#�(�ܤ)���uK"�[�M؏ǀj��{��n�n��5#��K;d|va����)��:��cO�X�:o$��X���8���&�!c<㸨�⒖���rc9�mҔ��sUْK�GMm��Fl�M�]����B�M� AU+�IM��.�ϖh\��ֆ�@��>���P���陲����A}%�Jl� �����)`��b�f	�֍�IK�hh���I1Y!J03�p8��	x��v�s�0��ب��~f}�c=�SG��׼�ϟb|�R�g9��X�<��|M�,A1υp�%�Ʉ7�ȩ:,��G�7(*oh�c�>T>%�R���"<�����h#�R_l08cS���@�m$�����c��إ�cL�����8�X}�2������(JI�'@����s��.ć!�Z��Y|b����&'      �   T   x�-��� �3���$�!�"���+��/�l�ic/�Z���e$v�^��+� ��>���*lu��rL�l����G"� ��}      �   �  x�m�ˎ�6Eל���A5�ojg�/N���X���@R;�ߧ��V�g��*<�����N��ܻ��z�(RY���<���O�q9O�t8�B�6�N�����4�ܬ����8>1`RH�Ap%	�N����#��p�
��VY�� ���4���Iq��NY�`��"@o��*��}^�x6��
v^�������$���N�Θ����D��::	����1)���	�f���+z�d/J���i�Sa����+�����n��� �:e[�}GHb�
�l�C��N��#բvt����aDiL)���G�����C�v��O�2�<���q�/$p!!:%;�[c4�{H߁�hxаA�V�`�n�sR�����Ċ)ig��e8=���P�be��#���p��^��ҭ�V�4 ;U��	w3[�R���!2ɦR�)�٢�Rx,�{`{Ҫ����O���ċ�\�՝��F�uV�8�Lx9Gc;mZ�5������m��oG&�Zs/#%6%˽ ϋ�U�
baW���i�8��P<��4�_�nݦ�i��c<5)R�"v��=9�Ƕ����(�d	"���j�n*�٠�4k,~��'���f�"�d��j�]���՘��{g��nmEk��Rd�۪æՆ��MP�1y���&*�.\+�R=d���@WC��m%"�{):i:�2djU�[���/�r��H���8J����zþ����k�.V�S�a~��Z����:�#]+�tpKc��e�ȝ�2�3�6IB�O��%�_�i���t�U��Wx�_�����Q���g��2tD�P�C��%�{k�0ɕY�{�5�D��7��9��-d+�
�����C1ɇbmԯ�R��.�Ї|�qa_�g�3�T�����n���n��V��S@\4��;$�	�uh)5�����}xx��      �   �  x���Kn[IE��*�>�,~�"z��w�Kh�� qg"�
� �����7t.�����΀ݬE�3���l/O?��M����k����:���>�,@��nΛ�BfS{���yz�16%�21#�'5b�#{=�[�(���p]������#ȏ�������8丸���y2����f��^���O��mMR��U�����!{�!n�*;w�JUm,fZ	=;���n�sp{���	�iUG�O��J��G?��d�[����o�����Ո�9������d�y^��I��$��j̮�M2�Pl��2�YL,���9u׼��ft�$^�ڞ����~j��T��֬s�j6���(w�������l��^��l	�1X-b����k�;��j�*�d�}��Z=�R����~�b���=�?(o�K�a�kV{���*m-��{@�$ؚCD��Qs�{�Q�%3�Loл,hj8Z;4��N��98�-x52������A/�*"*1�2�,��g��:�6s��5�'���0F(t7��kE���I��$7��T�:�?�^j�մcl���:ȩgr��]F4zcܯ'�v��,�q�h���a�X�9'�
��9��n�h&y��"[���-�8�@V� �-UG�v�c�-պl���+e2O�_<�I��7��v��K���q����k��     