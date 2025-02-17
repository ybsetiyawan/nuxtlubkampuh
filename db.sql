PGDMP  0                     }            db     16.6 (Ubuntu 16.6-1.pgdg22.04+1)     16.6 (Ubuntu 16.6-1.pgdg22.04+1) %    �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    43064    db    DATABASE     n   CREATE DATABASE db WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.UTF-8';
    DROP DATABASE db;
                postgres    false            �            1259    43065 
   c_material    TABLE     b  CREATE TABLE public.c_material (
    id character varying(36) NOT NULL,
    kode character varying(50),
    nama character varying(50),
    created_at timestamp without time zone DEFAULT now(),
    created_by character varying(36),
    updated_at timestamp without time zone,
    updated_by character varying(36),
    is_deleted boolean DEFAULT false
);
    DROP TABLE public.c_material;
       public         heap    postgres    false            �            1259    43070    c_role    TABLE     ^  CREATE TABLE public.c_role (
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
       public         heap    postgres    false            �            1259    43075    c_user    TABLE     �  CREATE TABLE public.c_user (
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
       public         heap    postgres    false            �            1259    43155 	   m_company    TABLE       CREATE TABLE public.m_company (
    id character varying(36) NOT NULL,
    nama character varying(250),
    alamat text,
    no_telp character varying(250),
    email character varying(50),
    npwp character varying(50),
    bank character varying(10),
    bank_no character varying(50),
    bank_an character varying(50),
    created_at timestamp without time zone DEFAULT now(),
    created_by character varying(36),
    updated_at timestamp without time zone,
    updated_by character varying(36),
    is_deleted boolean DEFAULT false
);
    DROP TABLE public.m_company;
       public         heap    postgres    false            �            1259    43083 
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
       public         heap    postgres    false            �            1259    43090 	   m_employe    TABLE     b  CREATE TABLE public.m_employe (
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
       public         heap    postgres    false            �            1259    43095    menu    TABLE     �  CREATE TABLE public.menu (
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
       public         heap    postgres    false            �            1259    43103 	   menu_user    TABLE     �  CREATE TABLE public.menu_user (
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
       public         heap    postgres    false            �            1259    43110 
   t_delivery    TABLE       CREATE TABLE public.t_delivery (
    id character varying(36) NOT NULL,
    doc_no character varying(7) NOT NULL,
    tanggal_kirim timestamp without time zone DEFAULT now(),
    id_customer character varying(50) NOT NULL,
    keterangan character varying(50),
    is_status character varying(1),
    created_at timestamp without time zone DEFAULT now(),
    created_by character varying(36),
    updated_at timestamp without time zone,
    updated_by character varying(36),
    is_deleted boolean DEFAULT false
);
    DROP TABLE public.t_delivery;
       public         heap    postgres    false            �            1259    43116    t_delivery_detail    TABLE     �  CREATE TABLE public.t_delivery_detail (
    id character varying(36) NOT NULL,
    id_delivery character varying(36) NOT NULL,
    id_material character varying(50) NOT NULL,
    qty integer NOT NULL,
    created_at timestamp without time zone DEFAULT now(),
    created_by character varying(36),
    updated_at timestamp without time zone,
    updated_by character varying(36),
    is_deleted boolean DEFAULT false,
    CONSTRAINT t_delivery_detail_qty_check CHECK ((qty > 0))
);
 %   DROP TABLE public.t_delivery_detail;
       public         heap    postgres    false            u          0    43065 
   c_material 
   TABLE DATA           p   COPY public.c_material (id, kode, nama, created_at, created_by, updated_at, updated_by, is_deleted) FROM stdin;
    public          postgres    false    215   �6       v          0    43070    c_role 
   TABLE DATA           l   COPY public.c_role (id, kode, nama, created_at, created_by, updated_at, updated_by, is_deleted) FROM stdin;
    public          postgres    false    216   �8       w          0    43075    c_user 
   TABLE DATA           �   COPY public.c_user (id, nama, username, password, id_role, aktif, created_at, created_by, updated_at, updated_by, is_deleted, id_customer) FROM stdin;
    public          postgres    false    217   �9       ~          0    43155 	   m_company 
   TABLE DATA           �   COPY public.m_company (id, nama, alamat, no_telp, email, npwp, bank, bank_no, bank_an, created_at, created_by, updated_at, updated_by, is_deleted) FROM stdin;
    public          postgres    false    224   �<       x          0    43083 
   m_customer 
   TABLE DATA           �   COPY public.m_customer (id, kode, nama, no_telp, alamat, email, npwp, created_at, created_by, updated_at, updated_by, is_deleted) FROM stdin;
    public          postgres    false    218   �=       y          0    43090 	   m_employe 
   TABLE DATA           o   COPY public.m_employe (id, kode, nama, created_at, created_by, updated_at, updated_by, is_deleted) FROM stdin;
    public          postgres    false    219   �@       z          0    43095    menu 
   TABLE DATA           �   COPY public.menu (id, nama_menu, link_menu, keterangan, class_icon, status, created_at, updated_at, is_permission, is_deleted) FROM stdin;
    public          postgres    false    220   UA       {          0    43103 	   menu_user 
   TABLE DATA           �   COPY public.menu_user (id, id_menu, posisi, level, urutan, status, created_at, updated_at, parent, id_role, is_deleted) FROM stdin;
    public          postgres    false    221   �E       |          0    43110 
   t_delivery 
   TABLE DATA           �   COPY public.t_delivery (id, doc_no, tanggal_kirim, id_customer, keterangan, is_status, created_at, created_by, updated_at, updated_by, is_deleted) FROM stdin;
    public          postgres    false    222   �I       }          0    43116    t_delivery_detail 
   TABLE DATA           �   COPY public.t_delivery_detail (id, id_delivery, id_material, qty, created_at, created_by, updated_at, updated_by, is_deleted) FROM stdin;
    public          postgres    false    223   $M       �           2606    43123    c_material c_material_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public.c_material
    ADD CONSTRAINT c_material_pkey PRIMARY KEY (id);
 D   ALTER TABLE ONLY public.c_material DROP CONSTRAINT c_material_pkey;
       public            postgres    false    215            �           2606    43125    c_role c_role_pk 
   CONSTRAINT     N   ALTER TABLE ONLY public.c_role
    ADD CONSTRAINT c_role_pk PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.c_role DROP CONSTRAINT c_role_pk;
       public            postgres    false    216            �           2606    43127    c_user c_user_pk 
   CONSTRAINT     N   ALTER TABLE ONLY public.c_user
    ADD CONSTRAINT c_user_pk PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.c_user DROP CONSTRAINT c_user_pk;
       public            postgres    false    217            �           2606    43163    m_company m_company_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.m_company
    ADD CONSTRAINT m_company_pkey PRIMARY KEY (id);
 B   ALTER TABLE ONLY public.m_company DROP CONSTRAINT m_company_pkey;
       public            postgres    false    224            �           2606    43129    m_customer m_customer_pk 
   CONSTRAINT     V   ALTER TABLE ONLY public.m_customer
    ADD CONSTRAINT m_customer_pk PRIMARY KEY (id);
 B   ALTER TABLE ONLY public.m_customer DROP CONSTRAINT m_customer_pk;
       public            postgres    false    218            �           2606    43131    m_employe m_employe_pk 
   CONSTRAINT     T   ALTER TABLE ONLY public.m_employe
    ADD CONSTRAINT m_employe_pk PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.m_employe DROP CONSTRAINT m_employe_pk;
       public            postgres    false    219            �           2606    43133    menu menu_pkey 
   CONSTRAINT     L   ALTER TABLE ONLY public.menu
    ADD CONSTRAINT menu_pkey PRIMARY KEY (id);
 8   ALTER TABLE ONLY public.menu DROP CONSTRAINT menu_pkey;
       public            postgres    false    220            �           2606    43135    menu_user menu_user_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.menu_user
    ADD CONSTRAINT menu_user_pkey PRIMARY KEY (id);
 B   ALTER TABLE ONLY public.menu_user DROP CONSTRAINT menu_user_pkey;
       public            postgres    false    221            �           2606    43137 (   t_delivery_detail t_delivery_detail_pkey 
   CONSTRAINT     f   ALTER TABLE ONLY public.t_delivery_detail
    ADD CONSTRAINT t_delivery_detail_pkey PRIMARY KEY (id);
 R   ALTER TABLE ONLY public.t_delivery_detail DROP CONSTRAINT t_delivery_detail_pkey;
       public            postgres    false    223            �           2606    43139    t_delivery t_delivery_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public.t_delivery
    ADD CONSTRAINT t_delivery_pkey PRIMARY KEY (id);
 D   ALTER TABLE ONLY public.t_delivery DROP CONSTRAINT t_delivery_pkey;
       public            postgres    false    222            �           2606    43140    c_user c_user_id_role_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.c_user
    ADD CONSTRAINT c_user_id_role_fkey FOREIGN KEY (id_role) REFERENCES public.c_role(id) ON UPDATE CASCADE;
 D   ALTER TABLE ONLY public.c_user DROP CONSTRAINT c_user_id_role_fkey;
       public          postgres    false    3282    217    216            �           2606    43145 4   t_delivery_detail t_delivery_detail_id_delivery_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.t_delivery_detail
    ADD CONSTRAINT t_delivery_detail_id_delivery_fkey FOREIGN KEY (id_delivery) REFERENCES public.t_delivery(id);
 ^   ALTER TABLE ONLY public.t_delivery_detail DROP CONSTRAINT t_delivery_detail_id_delivery_fkey;
       public          postgres    false    222    3294    223            �           2606    43150 4   t_delivery_detail t_delivery_detail_id_material_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.t_delivery_detail
    ADD CONSTRAINT t_delivery_detail_id_material_fkey FOREIGN KEY (id_material) REFERENCES public.c_material(id);
 ^   ALTER TABLE ONLY public.t_delivery_detail DROP CONSTRAINT t_delivery_detail_id_material_fkey;
       public          postgres    false    3280    215    223            u   �  x���M��0���)|9��R�;c�Ӌ!0Y�N���r ��	Ҳ��WOo/�ŽXhT8l5��M,�Q��+ w/�yx|����y^�Ƿ�#� ʀq�<�4bT%ꚿ�	5d7w[aG�Z�@���&�1eMֹ;ZA
�8A�A�,��d�{��v��� �XHPK�í
�/�[�V7�m;񱻿��~2�_���/N�L���oƥ��@�i��<om����$'�Sw_n��9a���(����yL(�x�x/R*W���ᣆl��xhNI7:����r<[�D8���\�|_���FV*ɹ���V�˶=�V���z���r{]^������噂'�1�\��_
S���y��r�����a���B�����??�L'HgI�\x1��8 xC'�#&�׾�W�>�}�����      v     x���=j1���s���I�l�ݒ,$���?]��=>A�O<H��������f�;l�
�T�da������{; ����q9o��� yF��3�¬��}�����2�,B#;�Di�QX=���`^zט�o�Zu}ZW,e#k!�Y ��ȳ첵�D���o�������if�(�yQ��O��<��Qj�$� [I�R���Mq�����(�������g��-�-I��1�3o\�a"q]��HlF�(�'�:�*+j���c���%�d�      w   +  x���KW*9F��+8MqN��3�W�*��N*/D-@���p}�=kWժ�T�J��}�M���R �*�BJ�i#D�&��j���2T����wGG���Y��?\آ������t�`?�������t��gs�=�2<ߦ���u8�����h�J�y2� 0\"W�d�u���q�����F�Q����;�G]`�T&�\��Qd��� Bh j{����ܕ�������u�0ٟ�|��]�,t�z`�DZ5.�Q���޸Cێ=���T
�*�X�蘔>�h=�wBI�L�d���B�l�����~U-a[��P��iKă3,�*�I��X���I�:Գ+]�㋈LBH��@LI�\�<��E�ZNS��<5�O�Q�>_�GW��I5�����r�<�73��Al�z>����i���@���]~W��ӓ�oA0�<���>�D`���>����es��P��2#d�@�!ͥr���|�n�cY}t>0�w�g]��;>_�z]=��7�^�`5N��/��+q5;�e���v��vT#�R,:�$�Q�,A�CJ@_0����-�
�Qqz���}��6��2�ҟ�Jڥ(D�}E�I�r���!��ٺ�4g[[^v;t��^��dF�v�z��5���v1.����^��j��߶ű����-�J��W̷����L����? �,U��M�Ĕ}��K��$������Ɂ���@x/K ��|��5������ǔ��i����Ə.�|�Nw����/�=�����k�Ff���&oD�@�:�+�����?�8#�BpDT�Z�z�܃g�      ~   �   x�5��N�0D��W��ֵ�p� �-u�����$`�I��.�{iG��J�")�CgxV��)d��}��L)sb϶��R7��A�qPٵ����}��k�tp�m.�"��8���$@�xB<wsw]�6S��8��f�Jn�,P��P�?�p�}�8�Mc�I���=��c
�T#J��
�_ܿ��*�(�2��*3����\n�����Q$I�PC�      x     x�m�ݎ�8���S����s��毅���fn*�n A��5o�e��Vώ�*L}��GkU�ޣ�1p1� S�Z'U�j-U��!ؿ�xM�iH�.�����'���`���W_��=�/d_S���c㒁K���|�)�%�>>��4�p���V���a�fzĆ������%��>#��O���7�z��ns���9D;��U�`���p.
I��JIe8(�4[[U�^:/M��T-��孪}-�AS��������uii��[m�iZM2i��m?z�KbiU��;�W�y��˕�cI��<aCRU��&���|�,ͯ�p���������Z�1*�C��vm<]�D�^Bk{�:� ,9�T��'I�>uɃJ��nN��y�û<����@f���R�v!ƛ�&��t�:<�����K��B:+],�"DɁP�@"�����Q���]t�T��^���6<��c��x��#61���ёHL1�>!��׼/�X�H�Xm(8s�%rlK*��бocKa��n��i���x���jh~.[�ި����\ Jqxg��e��%u�BT�2"���&`l��z�ɺ����Š[kd�˫�r©ٺ�l3���[��9�5�o��x&�U~��-uZ�;�e+.�L������_+*ja���%�5��JB�ƥț�[RO����ٲ����N�m�t�}>����t�3q(��n@w
��<��x9���v'�GB9U�ߎ �ʨ����=v�a�aA��D0A���\��X,��V      y   T   x�-��� �3���$�!�"���+��/�l�ic/�Z���e$v�^��+� ��>���*lu��rL�l����G"� ��}      z   {  x�m�Mo�H��ʯ����Cηn����.�v{�e>ñHr���ˑcIn�D��C��;�*\b��¤�Yi5�
��6���O�f��O�~���;�@���N���~8�yl�ǎi���|h�A��g��=�^�����A������	͍Sr�|��)J(>�m&C�)�wPtRR�T���|����v�������߂���d��W���X��D��G��*���$tN�Q�r֑�h8������
o>��)����]Z.7�Z��u������4t-P_\/tg
�w��L]�v4��0!7��Ȳ1�5/�3[�M��J���2N�c��яSv��`.UJ�����e�Ʊ��+�)%��C�x/y�����٬�t��&,��k-AJ$��4�4_�4�O��[�[�2��#;_���)��5��IԜo��쩩\v�q��Ĩ�D�MX�z2"KD�V��|k�6b����]�6�o�u�"�R���@L�r��a
�s��A'��:Ms�<K2:&��{��P�!
ČͿ�2�ø���
3-�JD��4�{T=�N(j���_iUI�f��D(��14�H1�|�es?��X}Y�~��XT����Y��غ��Aӡ@�N"x�)ff����	���-��	͗�r��ڇk���_
hsD�+n��+�DҎ3Z�{��uIq��Mff1�%�₳�$5_���N Cl����Fe?>m����O�$m���9��uNq�V&�ʞ6Hd��+FvUI�0� ������ˮo�����i�2���ث�̝�a�NZnj�B-��)E��T���:̈d�U瑜I�B ?�F#�9%k��P������y����|ͤ[b�>'�%3;����R�^�NYIn�⪺zd�:N���.(�HIc�4�4�,KV�,JH9���~�1���w�K��"���?��S�ji�p�v��/��B6�;���Yk��Tkpzs�b�nd\!g��L���U��\��|�H�c�y���2�ɕ�9�5�|h��mQw�
���p��FE8�"ȆDg��뿂%E�=���:�X��B�bD!S�(�2r����9�o��?�X�����x=H��T[-�:��[��}|�º�����;:�%��R+�2���w�2���      {   �  x��V]n�H|vN�`4�{����œ�6���D�5�STE��Y;N�s��n��*V<��~[�Fݰ��Q����Ո7ι��#B�w���">��Ԏ?�Wk�����VA��F@���p˚�~k�%*8�"����hw�-���U�Ǆ��D���Tqr1����_dL�U�du6�a�/+�o)���-�+��Z�K��,vnԔ�Z�� 4Z4�U8F�r���iV�[�����;�ѷ~���/��z�%�jѓPu� ������6�sT���Odt����*��TW,��4JMdA00}���D;���%�z[�ޠ��xn*kxi�l�ÙR^�D�F^gU�R����*~��0y��Fwn98���It��`90�m��zLƊ���j%���g%\W[�:磧�N���t�m��U�kO���.���՞�i�J���ԙ����q,�."CvO���n�`ʈ,�
�&��R6��1��]��z	������A�l:gb�|l��~LU{��1�����?c�s�CĎ�R�7�?��;��v�R�xub�ͫJX��fuB�� 3*|gʶ:���T����.�dU3�� �Z������aL�Qo��DF�n��Z�gh�ə���G�SWKʒv{X��v_��e��W�I�In���} {�U-KPM*-;�>Ӆсښ)P9L�����b)=�wWh�}��N?"���v���U?�����.�x�L2�R�I��L����!~�F�$�����Er�n���������ߩ\��!g�֧�[j��H깓���Y�mۋIl�����=[V�i�|,��;;�8�(�ki�����Þ�q!T�4�Ȳ(=x�y��[�"�d8M>§$�)�#��1s��L���v�l+��\272�D��\T+ǫY5���
dyS����� �hm�-��^~b�\��a�W���(��AӚ��\b��@�Ȅf�u�c�Vx�Q���O9�-Vn��3Xse~�Y�b������������)��|{{�3�u      |   %  x���Kn#9���)t�K�j�F��=N� q�J��aXƠ;H���p%���d�YJU?�=Wa_ZQH%$4C��K�a@�<�a���fls�����r�)�V%��v�f�|�漻?�/������~x���c�M'�{�v�K��E�s��Kf�� ��f!�|Zָ#`�ڢ�b�1�&�}ʥE-:�
oD���ILٽ}\��������/���5
�dO�1�m(��9d.~h��kK>G;�� 48��
���-(������������r�8?�w�Vy�$��0>��)�)�bDK��0�B�y�,&�\|�V.A��c �sgͦ%6 �h��Pe�*ac�����f��t@���Yf��B�"�=����"�*b����PA@c�3���}	'IK�[�=[M��ԇ���p��������/�/��	`	�r�;�yt�lS{�in/"��h��˷�w
s_����ϕ���#��+���l��;?\����b�?P�I,o�(w���\�<�/��@͑R���e��(�A�;��W����k��aq!g��m_���GUo�aB�$c�ڪ]S���bq�c�5�e�u >�E���ļ�!ж^)J=�Urh�\��Ŗ�˜ZU����Z�<��֑�½��y��b�W`c֧�,r��3R�U-Ւ(	�_#��m��,����s��)-߸�K��nlqa�2�ؠ��o6W�j_���-�E�p)W[��j��J+���a�&��>�x<��+;,_�*�3[�(ٗ�4!�M��������&      }     x��W[n#9��"�A��H�{�����G���;�A9�؀�,�Œ��I�r4��3��A}%�>���Wk�s�Fۗ��T�dZ��n��˼�{� �'-<��*Y�-��)�~�K?�D�ޓ~h�{D�I���_���[k}������Lu�N�W�r_u쫄	�y�J�2�Er��U���mזhC,》	X3E듢s��Y.�V��I]�WXwqmV	X K����(�VS�V����γmi������(BRX8�1�a��ۖ��t��Q�QQQS��Vp9��C[�RIJ/�V��yq)���ǰz_5�%���B=*����5�,�b���7�Q1�A�ӉG����U�z֖��!�a!V�3[*e7��Ё���gڑg����CXG�ʇ��o�9a�6�n���L0X��D�g��&Q���h-f��K��6�D��ʊ1���#ߺ�U�>�o�.�q3�Ŗ��e�/hߜ�d���T)f����y���V�;J*�..�"��핽w�V���e�� �R��(��F-G[�=�h_�5����i��^�����=�VOML�[ZPS8�<Q���9��Q�Oa4Qa�XksY�+݄k��.��H�\�x먉��dNV��h��R���;6^�`K��D>a�6©�bB�����!�_���|X�0{p���+,�<�-��&�Vk��RϪX�=_f���)���%,�*Zh�ҝC�v����'`����V���G
ϝ&2f�30}Q����ՙo��⾻d��A4uv�Տ:&�O���z��C%��%p�K� �0�5�N|\�<p=CePO�	o����;~� i�իV�=WeCз�N�%U�@ʂ���b���w��]>���k���v��g4�����I�y!��wh�E�Hi�ж%#E�<.M�k�B���:��	�81�x9��{ز��@e�'shb�,G� z�id�Ԁ��HːjV9����K��In�wx���,��ǀ��![?p��a�n^wʷ�"�p��I�	y�#@�]{~j���컾y�ĸO���N�c�^Z������/`��<2��qƊͨ9P���s1_�:�T�a!�W�mF��_�/_�݇x�#�,�i��~�����*n4�q�S���hq�U����$�AJa���I��9:q��WAx͟Ӡ� w#(�bs�t��Y[���g���jHEO�VQ�W��l�[b�/ y<ۊ{��W����,�r>�ϊ/��l��QA~��z5k}������?o�w     