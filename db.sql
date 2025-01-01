PGDMP      :    
             }            db    16.3    16.3     �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    74822    db    DATABASE     }   CREATE DATABASE db WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_United States.1252';
    DROP DATABASE db;
                postgres    false            �            1259    74823    c_role    TABLE     ^  CREATE TABLE public.c_role (
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
       public         heap    postgres    false            �            1259    74828    c_user    TABLE     �  CREATE TABLE public.c_user (
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
       public         heap    postgres    false            �            1259    74836 
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
       public         heap    postgres    false            �            1259    74843 	   m_employe    TABLE     b  CREATE TABLE public.m_employe (
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
       public         heap    postgres    false            �            1259    74848    menu    TABLE     �  CREATE TABLE public.menu (
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
       public         heap    postgres    false            �            1259    74856 	   menu_user    TABLE     �  CREATE TABLE public.menu_user (
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
       public         heap    postgres    false            �          0    74823    c_role 
   TABLE DATA           l   COPY public.c_role (id, kode, nama, created_at, created_by, updated_at, updated_by, is_deleted) FROM stdin;
    public          postgres    false    215   �       �          0    74828    c_user 
   TABLE DATA           �   COPY public.c_user (id, nama, username, password, id_role, aktif, created_at, created_by, updated_at, updated_by, is_deleted, id_customer) FROM stdin;
    public          postgres    false    216   3        �          0    74836 
   m_customer 
   TABLE DATA           �   COPY public.m_customer (id, kode, nama, no_telp, alamat, email, npwp, created_at, created_by, updated_at, updated_by, is_deleted) FROM stdin;
    public          postgres    false    217   �!       �          0    74843 	   m_employe 
   TABLE DATA           o   COPY public.m_employe (id, kode, nama, created_at, created_by, updated_at, updated_by, is_deleted) FROM stdin;
    public          postgres    false    218   �$       �          0    74848    menu 
   TABLE DATA           �   COPY public.menu (id, nama_menu, link_menu, keterangan, class_icon, status, created_at, updated_at, is_permission, is_deleted) FROM stdin;
    public          postgres    false    219   %       �          0    74856 	   menu_user 
   TABLE DATA           �   COPY public.menu_user (id, id_menu, posisi, level, urutan, status, created_at, updated_at, parent, id_role, is_deleted) FROM stdin;
    public          postgres    false    220   �(       <           2606    74864    c_role c_role_pk 
   CONSTRAINT     N   ALTER TABLE ONLY public.c_role
    ADD CONSTRAINT c_role_pk PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.c_role DROP CONSTRAINT c_role_pk;
       public            postgres    false    215            >           2606    74866    c_user c_user_pk 
   CONSTRAINT     N   ALTER TABLE ONLY public.c_user
    ADD CONSTRAINT c_user_pk PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.c_user DROP CONSTRAINT c_user_pk;
       public            postgres    false    216            @           2606    74868    m_customer m_customer_pk 
   CONSTRAINT     V   ALTER TABLE ONLY public.m_customer
    ADD CONSTRAINT m_customer_pk PRIMARY KEY (id);
 B   ALTER TABLE ONLY public.m_customer DROP CONSTRAINT m_customer_pk;
       public            postgres    false    217            B           2606    74870    m_employe m_employe_pk 
   CONSTRAINT     T   ALTER TABLE ONLY public.m_employe
    ADD CONSTRAINT m_employe_pk PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.m_employe DROP CONSTRAINT m_employe_pk;
       public            postgres    false    218            D           2606    74872    menu menu_pkey 
   CONSTRAINT     L   ALTER TABLE ONLY public.menu
    ADD CONSTRAINT menu_pkey PRIMARY KEY (id);
 8   ALTER TABLE ONLY public.menu DROP CONSTRAINT menu_pkey;
       public            postgres    false    219            F           2606    74874    menu_user menu_user_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.menu_user
    ADD CONSTRAINT menu_user_pkey PRIMARY KEY (id);
 B   ALTER TABLE ONLY public.menu_user DROP CONSTRAINT menu_user_pkey;
       public            postgres    false    220            G           2606    74875    c_user c_user_id_role_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.c_user
    ADD CONSTRAINT c_user_id_role_fkey FOREIGN KEY (id_role) REFERENCES public.c_role(id) ON UPDATE CASCADE;
 D   ALTER TABLE ONLY public.c_user DROP CONSTRAINT c_user_id_role_fkey;
       public          postgres    false    215    216    4668            �   �   x�M�1� �N��y��Lk��F��"�?B�ġ�7��)	���8'g�Fบ��c`Q����>=g�!a�o��&�eg=�>_�v5��P���Ș���tpF�	��_u���k�+b4�Q����r�����6*{      �   �  x����nQ���S�`{����B	)�2����9W4L \�ry�N�TB�U��_�d�MQ��H���	�a����Ҍ��ώ�]<ذ����G]�w����ޯ��|ϗ�^}yL�u�y=8�˯���q�y�/���p���Sf-8��j�J$�A �(G*!��&�@9A Tw)-@`r�h���>3���88�PӒ.�$�2$1��܂� 2l�z{mNӅ�Lfׯ�O|\�\�VQ:��v��<NS�<l�M�q�ԔP�EZ0U�kF�?�S6�U���X�^_i��1�@vu��TW{����å����u:���z'aX.U��W�������n�N��P���k&S�F�D�GG8���b!P�$7I�{���(P�L�d�Nߕ3ǜ��>�)#N�dej�$VM4����U��N�6��      �   �  x�mS�n�8}���`�)RONѢh��$���e�K�8�YBпߑ��m�� I�������Z�Z�������^���:֩����>�o~��}���ر�����#V�(����ς��Od�r�Cƞ��a͔�k���|ıck�}x��?�nM�(��姟:�ŖPTd��|��k�_�=t�ydN�D�r&��<6�ѥ� �9�炐t��������0e��E-]-��q�G�5�5 �H�!,ղ��($/�T�uܷ�UU��m4d�!����OwK,��n���ľ�i>M$�:��<��Glɪ���c�,�K���m_5�w�7�t�_	�kk��R�VE�d���CoC�<`r��	$	�	�v���"�:MDB�%��KP�Kf7}b��"��Ҁ��P���1��~�R~\ZlN�ϋ,gX�*�y���\�g����x���)+A����%�K ϱ ؐ-�eRmU]o�����FՂ�	�]1�
��!r����½Ú��7тLf�g(��c�M��v�o�����R7�_���Hnl��.׸�1_@,��|w�K�1HL�F����k �^���)i�,-�֙Sd��,��S���$ʝ���n�����g�=�I���Ϋ�a�z�/�U��n�?_�F�752ވ ����U#�����j������Z����3�      �   T   x�-��� �3���$�!�"���+��/�l�ic/�Z���e$v�^��+� ��>���*lu��rL�l����G"� ��}      �   c  x�m�Mo�6��ʯ�cA�C?o�-�m��~f�V ����w$ǲ�0�B|�μ�U5��U��X��d,C�F�)V�|	�\���K9��o��|h_�c�Ys�a*4�d��� �+�i�i���|���i%%�R%s��:$Ǳ��|��Տ/����N��E���.X�)���~k�� ���$��-'�x�N"G�~��UT�]f������,Z���,�VN���aa���0��]�-pq���@���#tRs���PcQ�b3�K��RV1��P�\���r��a;�`�����I0�-��� ��7&���:a�vvc��d�ȧRtb�gV�W�%��<�ʛ�a��0��1o�;�n��g_�a�u7ӄk�|q^��8!��L��K��Ia�p^+Ɛk��X&�0%�T��o�i�ˤ�a~LWa��-�M{���	���s/�W�)�`�!��w, l��-�Q윤�i7����h��U�?=݇�*.Lixb�y~�OP{�
���Z�L�� �nÖ�@�D<�m2:#[0Zp[r��O��j?���g�������n��B�UV�0���G�=�NY�>ޱj/���.��\��Ȭ��5�,�V�"k̥��J��9�L�F��Lə�a��%I��é��ԋӱ?��ؔ�Yr���ؔt-�57��p��PX�B0:]ʒ�P���R��������7�+�<���=�\��(�y�#)�H<VK}K���e�Y�v=�
Z�U�Uhbn����|I��ha����cG�m�P3�C
�]�z������!+r*�G���DxQ�%em�6/T���2��C�E[8^�	85�����{xx����-      �   N  x���Kn�@E�~����
��^A&�����)ɠ)�eY��޺�:f�8��! ����X�{(�Ql�u�Z6@FE𒏉�o�s�A�/F ��/h�E|"���?���\a��u���^Lb�>���O��L���( �U3��	��nY3ɚlG�
N�� ��?5�]h�t�1a�ē�\܀j�,�au�L�ɘ.����l|c�/+�U�'VV	]��.k�.��g�{4ۭ��cX&�Uh@���nqX���LK
\�@x��F`���~�`'9-�X���5ͺ�'3̀AC}�ѹ�/B�m�]�h�fC%�Ns���<�Ȏ��S�~1j�3�>A0F��f*�j�o�sV�d�#]hga�J_#Å%$ϛ}6�Z��z#�#G������~��c��ݥ�hO2�K�7�K�B?�x����^(L.���\��KE#�Jd���镌�{U�h�N"��r��ep$��f��>W�z��?X��̧W-T��tj���\�>��l�'�r�+d4�̶��	��]��XsͭZ	�I.�|���b�9�� ��"��OĨi�[MZ�P[A����^�����v#     